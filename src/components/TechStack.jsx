import { useReveal } from '../hooks/useReveal'
import './TechStack.css'

const GROUPS = [
  {
    label: 'API y mensajería',
    items: ['FastAPI', 'WebSocket', 'RabbitMQ', 'AMQP'],
  },
  {
    label: 'Persistencia',
    items: ['Oracle Database', 'Transacciones ACID'],
  },
  {
    label: 'Aislamiento',
    items: ['Docker', 'Linux namespaces', 'cgroups', 'iptables'],
  },
  {
    label: 'Seguridad',
    items: ['OAuth 2.0', 'JWT', 'SMTP', 'Argon2', 'SHA-256'],
  },
  {
    label: 'Medición y monitorización',
    items: ['perf', 'nvidia-smi', 'Prometheus', 'Grafana'],
  },
]

export default function TechStack() {
  const { ref, isVisible } = useReveal()
  return (
    <section id="stack" className="section techstack">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">07 // Stack tecnológico</span>
          <h2 className="section-title">Piezas de nivel de producción, no un prototipo</h2>
        </div>

        <div className="techstack__groups">
          {GROUPS.map((g, i) => (
            <TechGroup key={g.label} group={g} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TechGroup({ group, delay }) {
  const { ref, isVisible } = useReveal()
  return (
    <div ref={ref} className={`techstack__group reveal ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      <span className="techstack__group-label">{group.label}</span>
      <div className="techstack__chips">
        {group.items.map((item) => (
          <span key={item} className="techstack__chip chamfer-sm">{item}</span>
        ))}
      </div>
    </div>
  )
}
