import { useState, useEffect, useRef } from 'react'
import { X, Cpu, ShieldCheck, Sparkles, Heart, Coffee, ShieldAlert, Server } from 'lucide-react'
import { SITE } from '../siteConfig'
import './DonationWidget.css'

export default function DonationWidget() {
  const [lang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('synergia-language') || 'es'
    }
    return 'es'
  })

  // Popover states
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  // Real active mining state (CPU / RandomX only — no existe minado GPU real
  // en navegador, ver README-MINADO.md; el modo GPU se eliminó del todo)
  const [isMining, setIsMining] = useState(false)
  const [cpuHps, setCpuHps] = useState(0)

  // Accumulators for calculations — SOLO se incrementan con eventos reales
  // del worker (hashrate real) y de la pool (shares reales aceptadas/rechazadas)
  const [cpuHashesTotal, setCpuHashesTotal] = useState(0)
  const [acceptedShares, setAcceptedShares] = useState(0)
  const [rejectedShares, setRejectedShares] = useState(0)
  const [isConnectedToPool, setIsConnectedToPool] = useState(false)
  const [bridgeError, setBridgeError] = useState(null)

  // Prices (fetched dynamically; solo para mostrar una estimación orientativa,
  // nunca se usan para inventar shares)
  const [xmrPriceUsd, setXmrPriceUsd] = useState(154.50)
  const [isPriceLive, setIsPriceLive] = useState(false)

  const widgetRef = useRef(null)
  const workerRef = useRef(null)
  const cpuSocketRef = useRef(null)
  const currentJobRef = useRef(null)

  // Wallet configurada en siteConfig (MoneroOcean gestiona los payouts dinámicamente)
  const xmrWallet = SITE.donation?.xmrWallet || '42jRR9GC2pyMoxwbhtRxMuDRQz3iFc32Z8MEpuD67NUQB2pNrSXSQR55QD1wHS9pEVfQ5w2KrzGUx4HDfXg2H5eiHBDLwSm'
  // Puente WebSocket -> Stratum. No intenta evadir adblockers/Brave Shields:
  // si algo lo bloquea, la conexión falla y el widget lo informa (ver bridgeError).
  const serverBridgeUrl = SITE.donation?.bridgeUrl || 'ws://localhost:8080'

  // Fetch Live Prices on Mount / Start Mining
  useEffect(() => {
    const fetchLiveCryptoPrices = async () => {
      try {
        const res = await fetch('https://api.coinlore.net/api/tickers/')
        const json = await res.json()
        if (json && json.data && Array.isArray(json.data)) {
          const xmrData = json.data.find(coin => coin.symbol === 'XMR')
          const rvnData = json.data.find(coin => coin.symbol === 'RVN')
          if (xmrData && xmrData.price_usd) setXmrPriceUsd(parseFloat(xmrData.price_usd))
          if (rvnData && rvnData.price_usd) setRvnPriceUsd(parseFloat(rvnData.price_usd))
          setIsPriceLive(true)
        }
      } catch (err) {
        setIsPriceLive(false)
      }
    }

    fetchLiveCryptoPrices()

    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsPopoverOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    const handleOpenTrigger = () => {
      setIsPopoverOpen(true)
    }
    window.addEventListener('open-donation-modal', handleOpenTrigger)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('open-donation-modal', handleOpenTrigger)
      stopAllMiners()
    }
  }, [])

  // Diagnostics step logging
  const logStep = (stepNumber, status, message, details = '') => {
    const prefixes = {
      info: '🔵 [INFO]',
      success: '🟢 [SUCCESS]',
      warn: '⚠️ [WARN]',
      error: '🔴 [ERROR]'
    }
    console.log(
      `%c[Step 0${stepNumber}] ${prefixes[status]} ${message}`, 
      status === 'error' ? 'color: #ff453a; font-weight: bold;' : status === 'success' ? 'color: #30d158; font-weight: bold;' : 'color: #0070f3;',
      details
    )
  }

  // Conexión real WebSocket -> Stratum, a través de server-bridge.js.
  // No hace nada para evadir adblockers/Brave Shields: si el navegador
  // bloquea el WebSocket o el propio bridge, la conexión simplemente falla
  // y se informa al usuario (bridgeError). Eso es correcto y esperado.
  const connectPoolBridge = () => {
    logStep(3, 'info', `Conectando al puente: ${serverBridgeUrl}`)
    setBridgeError(null)

    try {
      const ws = new WebSocket(serverBridgeUrl)
      cpuSocketRef.current = ws

      ws.onopen = () => {
        logStep(3, 'success', 'Puente conectado. Enviando login a la pool.')
        setIsConnectedToPool(true)

        const loginPayload = {
          id: 1,
          method: 'login',
          params: {
            login: xmrWallet,
            pass: 'x',
            agent: 'SynergiaWebClient/2.0'
          }
        }
        ws.send(JSON.stringify(loginPayload))
      }

      ws.onmessage = (event) => {
        let response
        try {
          response = JSON.parse(event.data)
        } catch (err) {
          logStep(4, 'warn', 'Mensaje no parseable de la pool:', event.data)
          return
        }

        // Trabajo nuevo: puede venir en el login (result.job) o como notify posterior (method: 'job')
        const job = response.method === 'job'
          ? response.params
          : response.result && response.result.job

        if (job) {
          logStep(4, 'success', 'Nuevo job recibido de la pool.', job)
          const normalizedJob = {
            jobId: job.job_id,
            blob: job.blob,
            target: job.target,
            seedHash: job.seed_hash || job.seedHash || 'default',
            // Offset del nonce dentro del blob: 39 es el estándar de Monero.
            // Algunas pools "browser-friendly" usan otro; revisa su documentación.
            nonceOffset: job.nonce_offset ?? 39
          }
          currentJobRef.current = normalizedJob
          if (workerRef.current) {
            workerRef.current.postMessage({ type: 'newJob', job: normalizedJob })
          }
        }

        // Resultado de una share que enviamos nosotros
        if (response.id === 2) {
          if (response.result && response.result.status === 'OK') {
            logStep(8, 'success', 'Share ACEPTADA por la pool.')
            setAcceptedShares(prev => prev + 1)
          } else if (response.error) {
            logStep(8, 'error', 'Share RECHAZADA por la pool:', response.error)
            setRejectedShares(prev => prev + 1)
          }
        }
      }

      ws.onerror = () => {
        logStep(3, 'error', 'No se pudo abrir el WebSocket de minería.')
        setIsConnectedToPool(false)
        setBridgeError(
          lang === 'es'
            ? 'No se pudo conectar con el puente de minado. Si usas un adblocker o Brave Shields, es normal que lo bloquee — puedes desactivarlo para este sitio si quieres donar de verdad.'
            : 'Could not connect to the mining bridge. If you use an adblocker or Brave Shields, it is expected to block this — you can allowlist this site if you want to actually donate.'
        )
      }

      ws.onclose = () => {
        logStep(3, 'warn', 'Conexión con el puente cerrada.')
        setIsConnectedToPool(false)
      }
    } catch (e) {
      logStep(3, 'error', 'Fallo al iniciar la conexión de red.', e)
      setBridgeError(e.message)
    }
  }

  // Envía a la pool una share REAL encontrada por el worker de RandomX.
  const submitShare = (share) => {
    const ws = cpuSocketRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return

    const submitPayload = {
      id: 2,
      method: 'submit',
      params: {
        id: currentJobRef.current?.jobId,
        job_id: share.jobId,
        nonce: share.nonce,
        result: share.result
      }
    }
    logStep(7, 'info', 'Enviando share real a la pool...', submitPayload)
    ws.send(JSON.stringify(submitPayload))
  }

  // Arranca el Web Worker que ejecuta RandomX de verdad (src/workers/randomxMiner.worker.js)
  const startCpuMiner = () => {
    const worker = new Worker(
      new URL('../workers/randomxMiner.worker.js', import.meta.url),
      { type: 'module' }
    )

    worker.onmessage = (e) => {
      const msg = e.data
      if (msg.type === 'hashrate') {
        setCpuHps(msg.hps)
        setCpuHashesTotal(prev => prev + msg.hps) // aproximado; solo para mostrar orden de magnitud
      }
      if (msg.type === 'share') {
        submitShare(msg)
      }
    }

    workerRef.current = worker

    // Si aún no ha llegado ningún job de la pool, esperamos: el worker se
    // arranca en cuanto connectPoolBridge reciba el primer job real.
    if (currentJobRef.current) {
      worker.postMessage({ type: 'start', job: currentJobRef.current })
    }
  }

  const handleStartMining = () => {
    stopAllMiners()
    setIsMining(true)
    setIsPopoverOpen(true)

    connectPoolBridge()
    startCpuMiner()
  }

  const stopAllMiners = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'stop' })
      workerRef.current.terminate()
      workerRef.current = null
    }
    if (cpuSocketRef.current) {
      try { cpuSocketRef.current.close() } catch (e) {}
      cpuSocketRef.current = null
    }
    currentJobRef.current = null

    setIsMining(false)
    setCpuHps(0)
    setIsPopoverOpen(false)
    setIsConnectedToPool(false)
    logStep(1, 'warn', 'Minería pausada. Todos los flujos de red cerrados.')
  }

  const activeTotalHps = cpuHps
  const grandTotalHashes = cpuHashesTotal

  // NOTA HONESTA: no inventamos una conversión H/s -> USD. El pago real lo
  // calcula la pool (depende de la dificultad, la suerte y su fee), y con
  // RandomX en JS el hashrate por pestaña es tan bajo (decenas de H/s) que
  // cualquier estimación aquí sería ilusoria. Lo único verificable son las
  // shares realmente aceptadas por la pool, así que el progreso se basa en
  // eso, con una etiqueta explícita de que es orientativo.
  const COFFEE_GOAL_SHARES = 500 // ajusta según la dificultad real de tu puerto de pool
  const coffeeProgressPercent = Math.min(100, (acceptedShares / COFFEE_GOAL_SHARES) * 100)

  const generateProgressBar = (percent) => {
    const totalBlocks = 12
    const filledBlocks = Math.round((percent / 100) * totalBlocks)
    const emptyBlocks = totalBlocks - filledBlocks
    return `[${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}]`
  }

  return (
    <div className="donation-widget-wrapper" ref={widgetRef}>

      {/* Unified Floating Bubble Trigger */}
      {!isMining ? (
        <div 
          className={`donation-floating-bubble is-idle ${isPopoverOpen ? 'is-hidden-trigger' : ''}`}
          onClick={() => setIsPopoverOpen(true)}
          title={lang === 'es' ? 'Donar potencia para un café' : 'Donate power for a coffee'}
        >
          <div className="floating-bubble-pulse pulse-idle" />
          <Coffee size={14} className="floating-bubble-icon coffee-icon-accent" fill="currentColor" />
          <span className="idle-pill-text">{lang === 'es' ? 'Dona un café ☕' : 'Buy me a coffee ☕'}</span>
        </div>
      ) : (
        <div 
          className={`donation-floating-bubble is-active-bubble ${isPopoverOpen ? 'is-hidden-trigger' : ''}`}
          onClick={() => setIsPopoverOpen(true)}
          title={lang === 'es' ? 'Ver telemetría y donación' : 'View telemetry dashboard'}
        >
          <div className="floating-bubble-pulse" />
          <Heart size={16} fill="var(--blue)" stroke="var(--blue)" className="floating-bubble-icon" />
        </div>
      )}

      {/* 2. Unified Corner Popover Panel */}
      <div className={`donation-mini-dashboard strict-retro-panel font-body ${isPopoverOpen ? 'is-open' : ''}`}>
        <div className="mini-dashboard-header">
          <span className="retro-indicator-title" style={{ color: 'var(--blue)' }}>
            {isMining
              ? 'CONTRIBUTION: ACTIVE_CPU'
              : (!hasConsented ? 'CONSENT_VERIFICATION' : 'DONATION: CONFIGURATION_PANEL')}
          </span>
          <button className="mini-dashboard-close" onClick={() => setIsPopoverOpen(false)}>
            <X size={13} />
          </button>
        </div>

        {!isMining ? (
          !hasConsented ? (
            // Consent Verification View
            <div className="popover-setup-view">
              <div className="consent-warning-box">
                <ShieldAlert size={20} className="warning-icon" />
                <h4>{lang === 'es' ? 'ANTES DE EMPEZAR' : 'BEFORE YOU START'}</h4>
                <p>
                  {lang === 'es'
                    ? 'Esto usa la CPU de tu navegador para minar Monero (RandomX) real mientras esta pestaña esté abierta, y envía las shares encontradas a nuestra pool. El aporte real por pestaña es muy pequeño (unas decenas de H/s) — es simbólico, no esperes ganancias significativas. Si tienes un adblocker o Brave Shields activado, es probable que bloqueen la conexión; en ese caso no funcionará, y eso está bien.'
                    : 'This uses your browser CPU to actually mine Monero (RandomX) while this tab stays open, and submits any shares found to our pool. The real contribution per tab is tiny (tens of H/s) — it is symbolic, do not expect meaningful earnings. If you run an adblocker or Brave Shields, it will likely block the connection; that is expected and fine.'}
                </p>
              </div>

              <button 
                className="btn-start-contribution-retro accept-consent-btn"
                onClick={() => setHasConsented(true)}
              >
                <Sparkles size={12} style={{ display: 'inline', marginRight: '6px' }} />
                {lang === 'es' ? 'ACEPTAR Y CONTINUAR' : 'ACCEPT & CONTINUE'}
              </button>
            </div>
          ) : (
            // Mode Configuration View — solo CPU/RandomX: no existe minado GPU
            // real en navegador (KawPow requiere hardware nativo), así que no
            // ofrecemos esa opción para no repetir el mismo engaño.
            <div className="popover-setup-view">
              <p className="popover-explanation">
                {lang === 'es'
                  ? 'Minado real vía CPU (RandomX / Monero):'
                  : 'Real CPU mining (RandomX / Monero):'}
              </p>

              <div className="retro-options-list">
                <div className="retro-option-item is-selected">
                  <Cpu size={14} className="option-icon" />
                  <div className="option-text">
                    <strong>CPU (XMR)</strong>
                    <span>{lang === 'es' ? 'RandomX real en Web Worker' : 'Real RandomX in a Web Worker'}</span>
                  </div>
                </div>
              </div>

              <div className="donation-modal-notice" style={{ marginTop: '6px', padding: '8px 10px' }}>
                <ShieldCheck size={13} className="notice-icon" />
                <p style={{ fontSize: '11px', margin: 0 }}>
                  {lang === 'es' ? 'Solo computa mientras esta pestaña permanezca abierta.' : 'Only computes while this tab remains open.'}
                </p>
              </div>
              {bridgeError && (
                <div className="donation-modal-notice" style={{ marginTop: '6px', padding: '8px 10px', borderColor: 'var(--red-color, #ff453a)' }}>
                  <ShieldAlert size={13} className="notice-icon" />
                  <p style={{ fontSize: '11px', margin: 0 }}>{bridgeError}</p>
                </div>
              )}

              <button 
                className="btn-start-contribution-retro"
                style={{ marginTop: '10px', background: 'var(--blue)', color: '#fff', borderColor: 'transparent' }}
                onClick={handleStartMining}
              >
                <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                {lang === 'es' ? 'INICIAR APORTE' : 'START CONTRIBUTION'}
              </button>
            </div>
          )
        ) : (
          // Active Telemetry View (Displays when mining)
          <div className="retro-terminal-stats">
            
            {/* Engine Status Panel */}
            <div className="bridge-alert-panel" style={{ borderLeftColor: isConnectedToPool ? 'var(--green-color)' : 'var(--blue)', background: isConnectedToPool ? 'rgba(48, 209, 88, 0.08)' : 'rgba(0, 112, 243, 0.08)' }}>
              <Server size={14} className="alert-bridge-icon" style={{ color: isConnectedToPool ? 'var(--green-color)' : 'var(--blue)' }} />
              <div>
                <strong style={{ color: isConnectedToPool ? 'var(--green-color)' : 'var(--blue)' }}>
                  {isConnectedToPool ? 'POOL_ONLINE: REAL_STRATUM' : 'STANDALONE_WEB_ENGINE: ACTIVE'}
                </strong>
                <p style={{ fontSize: '10px', marginTop: '2px', opacity: 0.85 }}>
                  {isConnectedToPool
                    ? (lang === 'es' ? 'Conexión activa con la pool. Aportando shares reales.' : 'Connected to mining pool. Contributing real shares.')
                    : (lang === 'es' ? '100% en navegador. Computando prueba de trabajo autónoma.' : '100% in-browser. Autonomous proof-of-work computing.')}
                </p>
              </div>
            </div>

            <div className="stat-line" style={{ borderTop: '1px solid var(--line)', paddingTop: '8px', marginTop: '4px' }}>
              <span className="stat-tag">HASHRATE (RandomX real):</span>
              <strong className="stat-data">{activeTotalHps} H/s</strong>
            </div>

            <div className="stat-line">
              <span className="stat-tag">TOTAL_HASHES:</span>
              <strong className="stat-data">{grandTotalHashes}</strong>
            </div>

            <div className="stat-line">
              <span className="stat-tag">ACCEPTED_SHARES:</span>
              <strong className="stat-data text-green-color">{acceptedShares} OK</strong>
            </div>

            {rejectedShares > 0 && (
              <div className="stat-line text-red-color">
                <span className="stat-tag">REJECTED_SHARES:</span>
                <strong className="stat-data">{rejectedShares} FAIL</strong>
              </div>
            )}

            {/* Barra de progreso basada SOLO en shares reales aceptadas por la pool.
                No convertimos H/s a USD: con RandomX en navegador esa cifra sería
                ficticia. Si quieres una referencia de precio, la mostramos como
                dato informativo, no como "ganancia" calculada. */}
            <div className="retro-coffee-progress-box">
              <div className="coffee-label-row">
                <span className="coffee-label"><Coffee size={12} style={{ display: 'inline', marginRight: '4px', transform: 'translateY(1px)' }} /> COFFEE_GOAL:</span>
                <span className="coffee-val">{coffeeProgressPercent.toFixed(2)}%</span>
              </div>
              <div className="progress-ascii-bar">{generateProgressBar(coffeeProgressPercent)}</div>
              <div className="live-ticker-info">
                XMR ${xmrPriceUsd.toFixed(2)} {isPriceLive ? '[LIVE]' : '[EST.]'} — {lang === 'es' ? 'referencia de precio, no un cálculo de tus ganancias' : 'price reference, not an earnings calculation'}
              </div>
            </div>

            <div style={{ marginTop: '6px' }}>
              <button className="btn-stop-contribution-retro" onClick={stopAllMiners}>
                <span>STOP_APORTE</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}