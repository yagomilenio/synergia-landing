import { useReveal } from '../hooks/useReveal'
import './HowItWorks.css'

const STEPS = [
  {
    n: '01',
    title: 'Publica la tarea',
    code: 'repo/Makefile · repo/config.toml',
    desc: (
      <>
        Cualquier repositorio de GitHub puede convertirse en una tarea. Solo necesita un Makefile con los targets <span className="timeline__highlight-target">setup</span>, <span className="timeline__highlight-target">run</span> y <span className="timeline__highlight-target">clean</span>, y un config.toml que describe en <span className="timeline__highlight-target">[inputs]</span> de dónde vienen los datos, en <span className="timeline__highlight-target">[requirements]</span> y <span className="timeline__highlight-target">[download]</span> qué instalar, y en <span className="timeline__highlight-target">[outputs]</span> dónde escribir los resultados. El comando make run recibe el chunk asignado como variables de entorno (<span className="timeline__highlight-target">START/END</span> o <span className="timeline__highlight-target">WORD/WORDS</span>).
      </>
    ),
  },
  {
    n: '02',
    title: 'Se reparte en bloques',
    code: 'distribución de bloques',
    desc: 'Si la tarea tiene entradas, la plataforma las agrupa en bloques y las reparte de forma equitativa entre los nodos activos. Además, existen las tareas dinámicas que aceptan entradas nuevas en tiempo real.',
  },
  {
    n: '03',
    title: 'Un worker la ejecuta, aislada',
    code: 'namespaces · cgroups · iptables',
    desc: 'El código se ejecuta dentro de un contenedor, sin acceso al sistema anfitrión. Los dominios de red permitidos están restringidos y se verifica la integridad del repositorio y de las dependencias descargadas.',
  },
  {
    n: '04',
    title: 'El resultado se verifica en cruzado',
    code: 'SHA-256 · resultado canónico',
    desc: (
      <>
        Para tareas deterministas, el resultado canónico se establece por <span className="timeline__highlight-target">consenso de hashes SHA-256</span> y voto mayoritario. La primera entrega es aceptada de forma provisional, y ejecuciones redundantes posteriores de validadores reafirman o alteran el consenso. Si se detecta un fraude posterior, se revierte transaccionalmente el balance del atacante.
      </>
    ),
  },
  {
    n: '05',
    title: 'Se liquidan créditos y reputación',
    code: '+crédito · +reputación',
    desc: 'Quien procesó el bloque cobra créditos según el coste computacional aportado. Esos créditos se canjean después para publicar tareas propias.',
  },
]

export default function HowItWorks() {
  return (
    <section id="funcionamiento" className="section howitworks">
      <div className="container">
        <SectionIntro />
        <div className="timeline">
          <div className="timeline__rail" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionIntro() {
  const { ref, isVisible } = useReveal()
  return (
    <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
      <span className="eyebrow">02 // Funcionamiento</span>
      <h2 className="section-title">De un repositorio de GitHub a un resultado verificado</h2>
      <p className="section-kicker">
        Cinco pasos, siempre en este orden. Sin infraestructura propia ni wrappers específicos
        del lenguaje: si tu código corre en un Makefile, corre en Synergia.
      </p>
    </div>
  )
}

function Step({ step, index }) {
  const { ref, isVisible } = useReveal()
  const align = index % 2 === 0 ? 'left' : 'right'

  const renderVisual = () => {
    switch (index) {
      case 0:
        return (
          <div className="terminal-video">
            <div className="terminal-video__header">
              <span className="terminal-video__tab">Makefile</span>
              <span className="terminal-video__tab terminal-video__tab--inactive">config.toml</span>
            </div>
            <pre className="terminal-video__body font-body">
              <span className="type-line type-line-1">{"# --- Contrato de Tarea Synergia ---"}</span>
              <span className="type-line type-line-2">{"setup:"}</span>
              <span className="type-line type-line-3">{"\t@mkdir -p inputs outputs"}</span>
              <span className="type-line type-line-4">{"run:"}</span>
              <span className="type-line type-line-5">{"\tpython3 calculate.py $(START) $(END)"}</span>
              <span className="type-line type-line-6">{"clean:"}</span>
              <span className="type-line type-line-7">{"\trm -f outputs/*.json"}</span>
            </pre>
            <div className="terminal-video__laser" />
          </div>
        )
      case 1:
        return (
          <div className="terminal-video terminal-video--flex">
            <div className="splitter-container">
              <div className="splitter-source font-display">COORDINADOR_REPARTIDOR</div>
              <div className="splitter-arrow">↓</div>
              <div className="splitter-nodes">
                <div className="splitter-node font-body pulse-neon-green">CHUNK_01 [0-4]</div>
                <div className="splitter-node font-body pulse-neon-pink">CHUNK_02 [5-9]</div>
                <div className="splitter-node font-body pulse-neon-blue">CHUNK_03 [10-14]</div>
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
              <span className="terminal-video__title">// worker (Docker)</span>
            </div>
            <pre className="terminal-video__body terminal-video__body--code font-body">
              <span className="type-line type-line-1">· Iniciando contenedor synergia-task...</span>
              <span className="type-line type-line-2">· cgroups: CPU threads=4, RAM=2048MB</span>
              <span className="type-line type-line-3">· iptables: bloqueando puertos entrantes/salientes</span>
              <span className="type-line type-line-4">· git clone https://github.com/... /repo</span>
              <span className="type-line type-line-5">▶ make run START=0 END=4 (ejecutando en sandbox...)</span>
            </pre>
            <div className="terminal-video__laser" />
          </div>
        )
      case 3:
        return (
          <div className="terminal-video terminal-video--flex">
            <div className="verify-container">
              <div className="verify-row">
                <span className="font-body text-muted">Nodo_01:</span>
                <span className="font-body text-accent">SHA256: 4e9c0a...81df (MATCH)</span>
              </div>
              <div className="verify-row">
                <span className="font-body text-muted">Nodo_02:</span>
                <span className="font-body text-accent">SHA256: 4e9c0a...81df (MATCH)</span>
              </div>
              <div className="verify-arrow">↓</div>
              <div className="verify-badge pulse-neon-green font-display">CONSENSO_CANÓNICO_VALIDADO</div>
              <div className="verification-radar-pulse" />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="terminal-video terminal-video--flex" style={{ position: 'relative' }}>
            <div className="ledger-container">
              <div className="ledger-stat">
                <span className="text-muted">REPUTACIÓN DEL NODO</span>
                <strong className="text-accent">+1.50 PTS</strong>
              </div>
              <div className="ledger-stat">
                <span className="text-muted">CRÉDITOS LIQUIDADOS</span>
                <strong className="text-secondary">+12.50 CR</strong>
              </div>
            </div>
            <div className="ledger-beacon" title="Fin de Transmisión" />
            <div className="ledger-light-sweep" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={ref}
      className={`timeline__step timeline__step--${align} reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="timeline__node" aria-hidden="true">{step.n}</div>
      
      {align === 'left' ? (
        <>
          <div className="timeline__card chamfer-sm">
            <span className="timeline__card-code">{step.code}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
          <div className="timeline__visual-panel">
            {renderVisual()}
          </div>
        </>
      ) : (
        <>
          <div className="timeline__visual-panel">
            {renderVisual()}
          </div>
          <div className="timeline__card chamfer-sm">
            <span className="timeline__card-code">{step.code}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        </>
      )}
    </div>
  )
}
