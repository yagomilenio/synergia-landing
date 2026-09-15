import { useState, useEffect } from 'react'
import { Terminal, X } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './HowItWorks.css'

export default function HowItWorks() {
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]
  const [activeModal, setActiveModal] = useState(null)

  const STEPS = [
    {
      n: '01',
      title: t.how.steps[0].title,
      code: 'repo/config.toml',
      desc: t.how.steps[0].desc,
    },
    {
      n: '02',
      title: t.how.steps[1].title,
      code: lang === 'es' ? 'distribución de bloques' : 'block distribution',
      desc: t.how.steps[1].desc,
    },
    {
      n: '03',
      title: t.how.steps[2].title,
      code: 'namespaces · cgroups · iptables',
      desc: t.how.steps[2].desc,
    },
    {
      n: '04',
      title: t.how.steps[3].title,
      code: lang === 'es' ? 'SHA-256 · resultado canónico' : 'SHA-256 · canonical result',
      desc: t.how.steps[3].desc,
    },
    {
      n: '05',
      title: t.how.steps[4].title,
      code: lang === 'es' ? 'crédito · reputación' : '+credits · +reputation',
      desc: t.how.steps[4].desc,
    },
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModal(null)
    }
    if (activeModal !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeModal])

  const renderVisual = (index) => {
    switch (index) {
      case 0:
        return (
          <div className="terminal-video">
            <div className="terminal-video__header">
              <span className="terminal-video__tab">Makefile</span>
              <span className="terminal-video__tab terminal-video__tab--inactive">config.toml</span>
            </div>
            <pre className="terminal-video__body font-body">
              <span className="code-line code-comment">{lang === 'es' ? "# --- Contrato de Tarea Synergia ---" : "# --- Synergia Task Contract ---"}</span>
              <span className="code-line"><span className="code-target">setup:</span></span>
              <span className="code-line">{"\t@mkdir -p inputs outputs"}</span>
              <span className="code-line"><span className="code-target">run:</span></span>
              <span className="code-line">{"\tpython3 calculate.py $(START) $(END)"}</span>
              <span className="code-line"><span className="code-target">clean:</span></span>
              <span className="code-line">{"\trm -f outputs/*.json"}</span>
            </pre>
          </div>
        )
      case 1:
        return (
          <div className="terminal-video terminal-video--flex">
            <div className="splitter-container">
              <div className="splitter-source">{lang === 'es' ? 'SYNERGIA_LOGEX_ENGINE' : 'SCHEDULER_COORDINATOR'}</div>
              <div className="splitter-arrow">↓</div>
              <div className="splitter-nodes">
                <div className="splitter-node">CHUNK_01 [0-4]</div>
                <div className="splitter-node">CHUNK_02 [5-9]</div>
                <div className="splitter-node">CHUNK_03 [10-14]</div>
              </div>
              <div className="flying-block flying-block-1" />
              <div className="flying-block flying-block-2" />
              <div className="flying-block flying-block-3" />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="terminal-video">
            <div className="terminal-video__header">
              <span className="terminal-video__title">worker@synergia: ~ (Docker sandbox)</span>
            </div>
            <pre className="terminal-video__body font-body">
              <span className="code-line"><span style={{ color: '#555566' }}>  ·</span>  {lang === 'es' ? 'Iniciando contenedor synergia-task-1...' : 'Starting container synergia-task-1...'}</span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╭────</span> <span style={{ color: 'var(--blue)', fontWeight: 'bold' }}>{lang === 'es' ? 'contenedor iniciado' : 'container started'}</span> <span style={{ color: '#3a3a4a' }}>────╮</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>{lang === 'es' ? 'nombre' : 'name'}</span>      <span style={{ color: 'var(--blue)' }}>synergia-task-1</span> <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>cpu</span>               <span style={{ color: 'var(--blue)' }}>4 threads</span> <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>ram</span>                 <span style={{ color: 'var(--blue)' }}>2048 MB</span> <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>gpu</span>                       <span style={{ color: 'var(--blue)' }}>—</span> <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╰─────────────────────────────╯</span></span>
              <span className="code-line"><span style={{ color: 'var(--ok)', fontWeight: 'bold' }}>  ✓</span>  {lang === 'es' ? 'Conectado a tarea 1' : 'Connected to task 1'}</span>
              <span className="code-line"><span style={{ color: '#B060D0', fontWeight: 'bold' }}>  ▶</span>  <b>make run START=0 END=4</b></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╭───────────</span> <span style={{ color: 'var(--ok)', fontWeight: 'bold' }}>{lang === 'es' ? 'resultado' : 'result'}</span> <span style={{ color: '#3a3a4a' }}>───────────╮</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>returncode</span>            <span style={{ color: 'var(--ok)', fontWeight: 'bold' }}>0  OK</span>     <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>cpu cycles</span>    1,248,930,112     <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>cpu time</span>              4.821 s   <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>ram avg</span>               128.4 MB  <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╰─────────────────────────────────╯</span></span>
            </pre>
          </div>
        )
      case 3:
        return (
          <div className="terminal-video">
            <div className="terminal-video__header">
              <span className="terminal-video__title">synergia process-info --task-id 1 --process-id 1</span>
            </div>
            <pre className="terminal-video__body font-body">
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╭────────────</span> <span style={{ color: 'var(--blue)', fontWeight: 'bold' }}>{lang === 'es' ? 'proceso #1 · tarea #1' : 'process #1 · task #1'}</span> <span style={{ color: '#3a3a4a' }}>─────────────╮</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>{lang === 'es' ? 'rango' : 'range'}</span>             0 → 4                        <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>{lang === 'es' ? 'confirmaciones' : 'confirmations'}</span>    1                            <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>{lang === 'es' ? 'estado' : 'status'}</span>            <span style={{ color: 'var(--ok)', fontWeight: 'bold' }}>✓ {lang === 'es' ? 'verificado' : 'verified'}</span>  <span style={{ color: '#7E7E88' }}>({lang === 'es' ? '2 coinciden' : '2 match'})</span>  <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╰────────────────────────────────────────────────╯</span></span>
              <span className="code-line"></span>
              <span className="code-line" style={{ color: 'var(--blue)', fontWeight: 'bold' }}>  ID    worker   {lang === 'es' ? 'estado' : 'status'}       {lang === 'es' ? 'resultado' : 'result'}      </span>
              <span className="code-line" style={{ color: '#3a3a4a' }}> ─────────────────────────────────────────── </span>
              <span className="code-line">  <span style={{ color: '#B060D0', fontWeight: 'bold' }}>1 ★</span>   pepe     <span style={{ color: 'var(--ok)' }}>✓ {lang === 'es' ? 'canónica' : 'canonical'}</span>   <span style={{ color: '#7E7E88' }}>4e9c0a81df27…</span>  </span>
              <span className="code-line">  2     ana      <span style={{ color: 'var(--ok)' }}>✓ {lang === 'es' ? 'coincide' : 'matches'}</span>    <span style={{ color: '#7E7E88' }}>4e9c0a81df27…</span>  </span>
              <span className="code-line"></span>
              <span className="code-line"><span style={{ color: '#7E7E88' }}>  {lang === 'es' ? 'Para descargar un resultado:' : 'To download result:'}</span> <span style={{ color: 'var(--blue)' }}>output-task --task-id 1 --process-id 1</span></span>
            </pre>
          </div>
        )
      case 4:
        return (
          <div className="terminal-video">
            <div className="terminal-video__header">
              <span className="terminal-video__title">synergia get-user-details --username anonymous</span>
            </div>
            <pre className="terminal-video__body font-body">
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╭─────────────</span> <span style={{ color: 'var(--blue)', fontWeight: 'bold' }}>{lang === 'es' ? 'cuenta' : 'account'}</span> <span style={{ color: '#3a3a4a' }}>──────────────╮</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>{lang === 'es' ? 'usuario' : 'user'}</span>         anonymous         <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>{lang === 'es' ? 'creado' : 'created'}</span>          2026-03-12 10:24  <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>{lang === 'es' ? 'reputación' : 'reputation'}</span>      100.0             <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#7E7E88' }}>balance</span>         <span style={{ color: 'var(--ok)', fontWeight: 'bold' }}>↯ 142.50</span>          <span style={{ color: '#3a3a4a' }}>│</span></span>
              <span className="code-line"><span style={{ color: '#3a3a4a' }}>╰───────────────────────────────────╯</span></span>
              <span className="code-line"></span>
              <span className="code-line" style={{ color: 'var(--blue)', fontWeight: 'bold' }}>  ID   Dir     Contraparte   Importe   Tarea   Proceso   Fecha             </span>
              <span className="code-line" style={{ color: '#3a3a4a' }}> ───────────────────────────────────────────────────────────────────────── </span>
              <span className="code-line">  42   <span style={{ color: 'var(--ok)' }}>↓ IN</span>    SYSTEM_FEES   <span style={{ color: 'var(--ok)' }}>12.50</span>     1       0         2026-03-12 14:22  </span>
              <span className="code-line">  41   <span style={{ color: 'var(--ok)' }}>↓ IN</span>    SYSTEM_FEES   <span style={{ color: 'var(--ok)' }}>8.00</span>      3       1         2026-03-12 13:10  </span>
              <span className="code-line">  40   <span style={{ color: 'var(--warn)' }}>↑ OUT</span>   SYSTEM_FEES   <span style={{ color: 'var(--warn)' }}>15.00</span>     2       0         2026-03-12 11:05  </span>
            </pre>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="funcionamiento" className="section howitworks">
      <div className="container">
        <SectionIntro t={t} />
        <div className="timeline">
          {STEPS.map((s, i) => (
            <Step
              key={s.n}
              step={s}
              index={i}
              t={t}
              lang={lang}
              onOpenVisual={(idx) => setActiveModal(idx)}
            />
          ))}
        </div>
      </div>

      {activeModal !== null && (
        <div className="timeline__modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="timeline__modal-container chamfer-sm" onClick={(e) => e.stopPropagation()}>
            <div className="timeline__modal-header">
              <div className="timeline__modal-title-group">
                <span className="timeline__modal-step-badge">PASO {STEPS[activeModal].n}</span>
                <h4 className="timeline__modal-title">{STEPS[activeModal].title}</h4>
              </div>
              <button 
                type="button" 
                className="timeline__modal-close-btn" 
                onClick={() => setActiveModal(null)}
                aria-label="Cerrar simulación"
                title="Cerrar"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="timeline__modal-content">
              {renderVisual(activeModal)}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function SectionIntro({ t }) {
  const { ref, isVisible } = useReveal()
  return (
    <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
      <span className="eyebrow">{t.how.eyebrow}</span>
      <h2 className="section-title">{t.how.title}</h2>
      <p className="section-kicker">
        {t.how.kicker}
      </p>
    </div>
  )
}

function Step({ step, index, t, lang, onOpenVisual }) {
  const { ref, isVisible } = useReveal()

  return (
    <div
      ref={ref}
      className={`timeline__step reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="timeline__card chamfer-sm">
        <div className="timeline__card-top">
          <span className="timeline__card-code">{step.code}</span>
          <button
            type="button"
            className="timeline__modal-trigger"
            onClick={() => onOpenVisual(index)}
            title={lang === 'es' ? 'Ver simulación técnica' : 'View technical simulation'}
            aria-label={lang === 'es' ? 'Ver simulación técnica' : 'View technical simulation'}
          >
            <Terminal size={15} strokeWidth={1.5} />
          </button>
        </div>
        <h3>{step.title}</h3>
        <p>
          {step.desc}
          {index === 4 && (
            <>
              {' '}
              <a href="#economia" className="timeline__credits-link">
                {lang === 'es' ? 'Ver modelo económico y calculadora' : 'View economic model and calculator'}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
