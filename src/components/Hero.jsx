import { useState, useEffect, useRef } from 'react'
import { SITE } from '../siteConfig'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './Hero.css'

export default function Hero() {
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(50)

  const [terminalStep, setTerminalStep] = useState(0)
  const terminalRef = useRef(null)

  const FRASES = t.hero.frases;

  useEffect(() => {
    setText('')
    setIndex(0)
    setIsDeleting(false)
  }, [lang])

  useEffect(() => {
    let timer;
    const fullText = FRASES[index] || '';

    if (!isDeleting) {
      timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
        setSpeed(45);
      }, speed);

      if (text === fullText && fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
          setSpeed(25);
        }, 2500);
      }
    } else {
      timer = setTimeout(() => {
        setText(fullText.slice(0, text.length - 1));
        setSpeed(20);
      }, speed);

      if (text === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % FRASES.length);
        setSpeed(400);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, speed, FRASES]);

  // Terminal auto-advance timing
  const STEP_DELAYS = [
    500,  // Step 0: Command
    400,  // Step 1: SETUP
    400,  // Step 2: info Obteniendo datos...
    400,  // Step 3: info Iniciando entorno...
    600,  // Step 4: Container panel
    450,  // Step 5: info Clonando repo...
    550,  // Step 6: Commit panel
    450,  // Step 7: info Instalando dependencias...
    400,  // Step 8: info Aplicando políticas...
    400,  // Step 9: info Limpiando...
    500,  // Step 10: ok Conectado a tarea 1
    450,  // Step 11: RUN
    700,  // Step 12: run make run
    650,  // Step 13: Result stats panel
    600,  // Step 14: Summary panel
    8500  // Step 15: Prompt final -> delay then restart loop
  ]

  useEffect(() => {
    const delay = STEP_DELAYS[terminalStep] || 500
    const timer = setTimeout(() => {
      setTerminalStep((prev) => (prev + 1) % STEP_DELAYS.length)
    }, delay)

    return () => clearTimeout(timer)
  }, [terminalStep])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [terminalStep])

  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow">{t.hero.eyebrow}</span>

          <h1 className="hero__title">
            SYNERGIA
          </h1>

          <p className="hero__subtitle">
            {text}
            <span className="cursor-blink" aria-hidden="true" />
          </p>

          <p className="hero__desc">
            {t.hero.desc}
          </p>

          <div className="hero__actions">
            <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="btn">
              {t.hero.btnServer}
            </a>
            <a href={SITE.clientRepoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              {t.hero.btnClient}
            </a>
            <a href="#documentacion" className="btn btn--ghost">
              {t.hero.btnDocs}
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>{t.hero.stat1_val}</strong>
              <span>{t.hero.stat1_desc}</span>
            </div>
            <div>
              <strong>{t.hero.stat2_val}</strong>
              <span>{t.hero.stat2_desc}</span>
            </div>
            <div>
              <strong>{t.hero.stat3_val}</strong>
              <span>{t.hero.stat3_desc}</span>
            </div>
          </div>
        </div>

        <div className="hero__panel" aria-hidden="true">
          <div className="hero__panel-header">
            <span className="hero__panel-title">{t.hero.terminal_title}</span>
          </div>
          <pre className="hero__panel-body font-body" ref={terminalRef}>
            {terminalStep >= 0 && (
              <span className="hero__log-line">
                <span style={{ color: 'var(--blue)' }}>$</span> synergia subscribe-task --task-id 1
              </span>
            )}

            {terminalStep >= 1 && (
              <span className="hero__log-line">
                {'\n'}
                <span style={{ color: '#7B8CDE', fontWeight: 'bold' }}>SETUP</span> <span style={{ color: '#3a3a4a' }}>────────────────────────────────────────────────</span>{'\n'}
              </span>
            )}

            {terminalStep >= 2 && (
              <span className="hero__log-line">
                <span style={{ color: '#555566' }}>  ·</span>  <span style={{ color: '#C8C8D4' }}>{lang === 'es' ? 'Obteniendo datos de la tarea...' : 'Fetching task data...'}</span>
              </span>
            )}

            {terminalStep >= 3 && (
              <span className="hero__log-line">
                <span style={{ color: '#555566' }}>  ·</span>  <span style={{ color: '#C8C8D4' }}>{lang === 'es' ? 'Iniciando entorno aislado...' : 'Launching isolated sandbox...'}</span>
              </span>
            )}

            {terminalStep >= 4 && (
              <span className="hero__log-line">
                <span style={{ color: '#3a3a4a' }}>╭────</span> <span style={{ color: '#7B8CDE', fontWeight: 'bold' }}>{lang === 'es' ? 'contenedor iniciado' : 'container started'}</span> <span style={{ color: '#3a3a4a' }}>────╮</span>{'\n'}
                <span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#555566' }}>nombre</span>      <span style={{ color: '#7B8CDE' }}>synergia-task-1</span> <span style={{ color: '#3a3a4a' }}>│</span>{'\n'}
                <span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#555566' }}>cpu</span>               <span style={{ color: '#7B8CDE' }}>4 threads</span> <span style={{ color: '#3a3a4a' }}>│</span>{'\n'}
                <span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#555566' }}>ram</span>                 <span style={{ color: '#7B8CDE' }}>2048 MB</span> <span style={{ color: '#3a3a4a' }}>│</span>{'\n'}
                <span style={{ color: '#3a3a4a' }}>│</span> <span style={{ color: '#555566' }}>gpu</span>                       <span style={{ color: '#7B8CDE' }}>—</span> <span style={{ color: '#3a3a4a' }}>│</span>{'\n'}
                <span style={{ color: '#3a3a4a' }}>╰─────────────────────────────╯</span>
              </span>
            )}

            {terminalStep >= 5 && (
              <span className="hero__log-line">
                <span style={{ color: '#555566' }}>  ·</span>  <span style={{ color: '#C8C8D4' }}>{lang === 'es' ? 'Clonando repositorio...' : 'Cloning repository...'}</span>
              </span>
            )}

            {terminalStep >= 6 && (
              <span className="hero__log-line">
                <span style={{ color: '#F0A500' }}>╭──────────────────────────────────────╮</span>{'\n'}
                <span style={{ color: '#F0A500' }}>│</span> <span style={{ color: '#F0A500', fontWeight: 'bold' }}>HEAD detached</span>  <span style={{ color: '#555566' }}>→</span>  <span style={{ color: '#7B8CDE' }}>a3c8e1a</span>            <span style={{ color: '#F0A500' }}>│</span>{'\n'}
                <span style={{ color: '#F0A500' }}>│</span>   <span style={{ color: '#555566' }}>feat: init Monte Carlo calculation</span> <span style={{ color: '#F0A500' }}>│</span>{'\n'}
                <span style={{ color: '#F0A500' }}>╰──────────────────────────────────────╯</span>
              </span>
            )}

            {terminalStep >= 7 && (
              <span className="hero__log-line">
                <span style={{ color: '#555566' }}>  ·</span>  <span style={{ color: '#C8C8D4' }}>{lang === 'es' ? 'Instalando dependencias y actualizando sistema...' : 'Installing dependencies and updating system...'}</span>
              </span>
            )}

            {terminalStep >= 8 && (
              <span className="hero__log-line">
                <span style={{ color: '#555566' }}>  ·</span>  <span style={{ color: '#C8C8D4' }}>{lang === 'es' ? 'Aplicando políticas de seguridad...' : 'Applying security policies...'}</span>
              </span>
            )}

            {terminalStep >= 9 && (
              <span className="hero__log-line">
                <span style={{ color: '#555566' }}>  ·</span>  <span style={{ color: '#C8C8D4' }}>{lang === 'es' ? 'Limpiando archivos innecesarios...' : 'Cleaning unnecessary files...'}</span>
              </span>
            )}

            {terminalStep >= 10 && (
              <span className="hero__log-line">
                <span style={{ color: '#4EC99B', fontWeight: 'bold' }}>  ✓</span>  <span style={{ color: '#4EC99B', fontWeight: '500' }}>{lang === 'es' ? 'Conectado a tarea 1' : 'Connected to task 1'}</span>
              </span>
            )}

            {terminalStep >= 11 && (
              <span className="hero__log-line">
                {'\n'}
                <span style={{ color: '#7B8CDE', fontWeight: 'bold' }}>RUN</span> <span style={{ color: '#3a3a4a' }}>──────────────────────────────────────────────────</span>{'\n'}
              </span>
            )}

            {terminalStep >= 12 && (
              <span className="hero__log-line">
                <span style={{ color: '#B060D0', fontWeight: 'bold' }}>  ▶</span>  <b style={{ color: '#ffffff' }}>make run START=0 END=4</b>
              </span>
            )}

            {terminalStep >= 13 && (
              <span className="hero__log-line">
                <span style={{ color: '#4EC99B' }}>╭────────────────────</span> <span style={{ color: '#4EC99B', fontWeight: 'bold' }}>{lang === 'es' ? 'resultado' : 'result'}</span> <span style={{ color: '#4EC99B' }}>────────────────────╮</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span>                                                   <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span>    <span style={{ color: '#555566' }}>returncode</span>                 <span style={{ color: '#4EC99B', fontWeight: 'bold' }}>0  OK</span>               <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span>    <span style={{ color: '#555566' }}>cpu cycles</span>         <span style={{ color: '#C8C8D4' }}>1,248,930,112</span>               <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span>    <span style={{ color: '#555566' }}>cpu time</span>                   <span style={{ color: '#C8C8D4' }}>4.821     s</span>         <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span>    <span style={{ color: '#555566' }}>ram avg</span>                    <span style={{ color: '#C8C8D4' }}>128.4     MB</span>        <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span>                                                   <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>╰───────────────────────────────────────────────────╯</span>
              </span>
            )}

            {terminalStep >= 14 && (
              <span className="hero__log-line">
                {'\n'}
                <span style={{ color: '#4EC99B' }}>╭────</span> <span style={{ color: '#4EC99B', fontWeight: 'bold' }}>{lang === 'es' ? 'completado' : 'completed'}</span> <span style={{ color: '#4EC99B' }}>────╮</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span> <span style={{ color: '#555566' }}>task</span>            <span style={{ color: '#7B8CDE', fontWeight: 'bold' }}>1</span>  <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span> <span style={{ color: '#555566' }}>process</span>        <span style={{ color: '#7B8CDE', fontWeight: 'bold' }}>12</span>  <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>│</span> <span style={{ color: '#555566' }}>execution</span>      <span style={{ color: '#7B8CDE', fontWeight: 'bold' }}>34</span>  <span style={{ color: '#4EC99B' }}>│</span>{'\n'}
                <span style={{ color: '#4EC99B' }}>╰────────────────────╯</span>
              </span>
            )}

            {terminalStep >= 15 && (
              <span className="hero__log-line hero__log-line--prompt">
                {'\n'}
                <span className="hero__prompt">$</span> {t.hero.terminal_waiting}
                <span className="cursor-blink" />
              </span>
            )}
          </pre>
        </div>
      </div>
    </section>
  )
}
