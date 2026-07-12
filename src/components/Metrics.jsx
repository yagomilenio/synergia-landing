import { useReveal } from '../hooks/useReveal'
import './Metrics.css'

const METRICS = [
  { value: '25', label: 'endpoints en la API REST + 1 canal WebSocket', suffix: '' },
  { value: '23', label: 'comandos disponibles en el cliente CLI', suffix: '' },
  { value: '6', label: 'tipos de entrada soportados por config.toml', suffix: '' },
  { value: '8', label: 'métricas Prometheus expuestas en tiempo real', suffix: '' },
]

export default function Metrics() {
  const { ref, isVisible } = useReveal()
  return (
    <section className="section section--tight metrics">
      <div className="container">
        <div ref={ref} className={`metrics__grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {METRICS.map((m) => (
            <div key={m.label} className="metrics__item">
              <strong>
                {m.value}
                <span>{m.suffix}</span>
              </strong>
              <p>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
