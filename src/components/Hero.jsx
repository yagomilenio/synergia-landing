import { useState, useEffect } from 'react'
import { SITE } from '../siteConfig'
import './Hero.css'

const LOG_ENTRIES = [
  { type: 'info', text: 'Obteniendo datos de la tarea...' },
  { type: 'info', text: 'Iniciando entorno aislado...' },
  {
    type: 'container',
    title: 'contenedor iniciado',
    data: [
      { label: 'nombre', value: 'synergia-task-889a' },
      { label: 'cpu', value: '4 threads' },
      { label: 'ram', value: '2048 MB' },
      { label: 'gpu', value: '—' },
    ]
  },
  { type: 'info', text: 'Clonando repositorio de GitHub...' },
  {
    type: 'commit',
    commit: 'a3c8e1a',
    message: 'feat: init Monte Carlo calculation'
  },
  { type: 'info', text: 'Instalando dependencias y actualizando sistema...' },
  { type: 'info', text: 'Aplicando políticas de seguridad (iptables)...' },
  { type: 'info', text: 'Limpiando archivos innecesarios (make clean)...' },
  { type: 'success', text: 'Conectado a tarea task-889a-4c22-b2df' },
  { type: 'run', text: 'Procesando chunk [10 - 20]...' },
]

const FRASES = [
  'Convierte hardware inactivo en potencia de cómputo intercambiable.',
  'Sin suscripciones mensuales ni alquileres costosos en la nube.',
  'Publica tareas pesadas simplemente subiendo un Makefile a GitHub.',
  'Tus procesos se ejecutan de forma 100% aislada mediante sandboxing.',
  'Gana créditos prestando tu CPU o GPU cuando no las utilices.',
  'Canjea tus créditos acumulados para entrenar modelos de IA o renderizar.',
  'Consenso garantizado: todos los resultados se verifican por duplicado.',
  'Rentabiliza tu propio hardware transformando capacidad de cómputo en créditos de cálculo.',
  'Una red distribuida de alto rendimiento, libre de especulación.',
  'Sin wallets ni blockchain: gestionamos una economía limpia y justa.',
  'Monitorea tus nodos en tiempo real con Prometheus y Grafana.',
  'Aislamiento total con namespaces de Linux, cgroups y restricciones de red.',
  'Verificación cruzada de hashes SHA-256 para prevenir fraudes.',
  'Conecta tu cliente CLI en segundos y empieza a procesar tareas.',
  'Divide tareas masivas en bloques y procésalas en paralelo.',
  'Ejecuta LLMs de código abierto localmente con total privacidad.',
  'Tu hardware doméstico ahora forma parte de un superordenador global.',
  'Garantía de integridad: auditamos cada repositorio antes de ejecutar.',
  'Optimiza el hardware que ya posees y elimina costes en la nube.',
  'Synergia: la alternativa abierta a los monopolios del cloud computing.'
]

export default function Hero() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(50)

  useEffect(() => {
    let timer;
    const fullText = FRASES[index];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
        setSpeed(45);
      }, speed);

      if (text === fullText) {
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
  }, [text, isDeleting, index, speed]);

  return (
    <section id="top" className="hero circuit-grid">
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />
      <div className="hero__glow hero__glow--c" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow">PLATAFORMA DE CÓMPUTO DISTRIBUIDO</span>

          <h1 className="hero__title">
            <span className="glitch-text" data-text="SYNERGIA">SYNERGIA</span>
          </h1>

          <p className="hero__subtitle">
            <span className="hero__prompt">&gt;</span> {text}
            <span className="cursor-blink" aria-hidden="true" />
          </p>

          <p className="hero__desc">
            Publica tareas computacionalmente costosas como un repositorio de GitHub.
            Cualquier nodo de la red puede procesarlas de forma aislada y segura, y a cambio
            recibe créditos que luego canjea para ejecutar sus propias tareas. Sin alquilar
            un solo servidor en la nube.
          </p>

          <div className="hero__actions">
            <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="btn">
              Ver servidor
            </a>
            <a href={SITE.clientRepoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Ver cliente CLI
            </a>
            <a href="#documentacion" className="btn btn--ghost">
              Documentación ↓
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>&lt; 5 min</strong>
              <span>de git clone a tu primer bloque procesado</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>aislamiento — cero acceso al host, siempre en contenedor</span>
            </div>
            <div>
              <strong>OpenSource</strong>
              <span>nadie se lucra, eliges tú a quién ayudar</span>
            </div>
          </div>
        </div>

        <div className="hero__panel chamfer" aria-hidden="true">
          <div className="hero__panel-header">
            <span className="hero__dot hero__dot--r" />
            <span className="hero__dot hero__dot--y" />
            <span className="hero__dot hero__dot--g" />
            <span className="hero__panel-title">nodo_worker</span>
          </div>
          <div className="hero__panel-body">
            {LOG_ENTRIES.map((entry, i) => {
              const delay = `${1.1 + i * 0.22}s`;
              
              if (entry.type === 'info') {
                return (
                  <p key={i} className="hero__log-line font-body" style={{ animationDelay: delay }}>
                    <span style={{ color: '#555566', marginRight: '10px', fontWeight: 'bold' }}>·</span>
                    <span style={{ color: '#C8C8D4' }}>{entry.text}</span>
                  </p>
                )
              }
              
              if (entry.type === 'success') {
                return (
                  <p key={i} className="hero__log-line font-body" style={{ animationDelay: delay }}>
                    <span style={{ color: '#4EC99B', marginRight: '10px', fontWeight: 'bold' }}>✓</span>
                    <span style={{ color: '#4EC99B', fontWeight: '500' }}>{entry.text}</span>
                  </p>
                )
              }

              if (entry.type === 'run') {
                return (
                  <p key={i} className="hero__log-line font-body" style={{ animationDelay: delay }}>
                    <span style={{ color: '#B060D0', marginRight: '10px', fontWeight: 'bold' }}>▶</span>
                    <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{entry.text}</span>
                  </p>
                )
              }

              if (entry.type === 'container') {
                return (
                  <div key={i} className="hero__log-line hero__mini-panel font-body" style={{ animationDelay: delay }}>
                    <div className="hero__mini-panel-header">{entry.title}</div>
                    {entry.data.map((row) => (
                      <div key={row.label} className="hero__mini-panel-row">
                        <span>{row.label}</span>
                        <span>{row.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }

              if (entry.type === 'commit') {
                return (
                  <div key={i} className="hero__log-line hero__mini-panel hero__mini-panel--warning font-body" style={{ animationDelay: delay }}>
                    <div className="hero__mini-panel-header">
                      <span style={{ color: '#F0A500', fontWeight: 'bold' }}>HEAD detached</span>
                      <span style={{ color: '#555566' }}> → </span>
                      <span style={{ color: '#7B8CDE', fontWeight: 'bold' }}>{entry.commit}</span>
                    </div>
                    <div className="hero__mini-panel-sub">{entry.message}</div>
                  </div>
                )
              }

              return null;
            })}
            <p className="hero__log-line hero__log-line--prompt" style={{ animationDelay: `${1.1 + LOG_ENTRIES.length * 0.22}s` }}>
              <span className="hero__prompt">$</span> esperando siguiente bloque
              <span className="cursor-blink" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
