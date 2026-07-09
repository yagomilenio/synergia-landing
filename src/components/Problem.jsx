import { useReveal } from '../hooks/useReveal'
import './Problem.css'

const FACTS = [
  {
    tag: 'HW-01',
    stat: '40–60%',
    desc: 'de la capacidad de procesamiento de un ordenador personal permanece infrautilizada durante su ciclo de vida.',
  },
  {
    tag: 'HW-02',
    stat: '~32M',
    desc: 'de procesadores y tarjetas gráficas dedicadas se distribuyeron solo en el cuarto trimestre de 2025.',
  },
  {
    tag: 'HW-03',
    stat: '5 GHz+',
    desc: 'de frecuencia y hasta 32 hilos de ejecución en las CPUs de consumo más recientes, la mayor parte del tiempo en reposo.',
  },
]

export default function Problem() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="problema" className="section problem">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">01 // El problema</span>
          <h2 className="section-title">
            Hay potencia de cómputo de sobra. Está apagada en salones y despachos.
          </h2>
          <p className="section-kicker">
            El coste de las GPUs y la RAM no deja de subir, empujado por la demanda de la IA.
            Para muchos, la única vía de acceso a cómputo real es pagar a AWS, Azure o Google Cloud
            por hora. Mientras tanto, millones de equipos personales pasan la mayor parte del día
            en reposo.
          </p>
        </div>

        <div className="problem__grid">
          {FACTS.map((f, i) => (
            <FactCard key={f.tag} fact={f} delay={i * 0.08} />
          ))}
        </div>

        <div className="problem__quote chamfer-sm">
          <span className="problem__quote-mark">&gt;</span>
          <p>
            Synergia propone una vía intermedia: quien tiene una CPU potente pero carece de GPU
            puede procesar tareas de otros y acumular créditos&nbsp;— créditos que después canjea
            para publicar sus propias tareas intensivas en GPU, sin comprar hardware nuevo ni
            contratar infraestructura en la nube.
          </p>
        </div>
      </div>
    </section>
  )
}

function FactCard({ fact, delay }) {
  const { ref, isVisible } = useReveal()
  return (
    <div
      ref={ref}
      className={`fact-card chamfer-sm reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="fact-card__tag">{fact.tag}</span>
      <strong className="fact-card__stat">{fact.stat}</strong>
      <p>{fact.desc}</p>
    </div>
  )
}
