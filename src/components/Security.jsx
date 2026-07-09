import { Box, ShieldCheck, KeyRound, FileCheck2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import './Security.css'

const LAYERS = [
  {
    icon: Box,
    title: 'Aislamiento por contenedor',
    desc: 'Cada tarea corre dentro de un contenedor propio. Namespaces y cgroups de Linux limitan qué puede ver y cuánto puede consumir; ninguna tarea llega a tocar el sistema anfitrión.',
  },
  {
    icon: ShieldCheck,
    title: 'Red restringida',
    desc: 'iptables aplica en tiempo de ejecución la lista de dominios permitidos que declara la propia tarea en su config.toml. Si no está en la lista, no hay salida.',
  },
  {
    icon: KeyRound,
    title: 'Autenticación reforzada',
    desc: 'OAuth 2.0 y autenticación local con verificación por correo (SMTP) evitan la duplicidad de cuentas — clave para que la reputación y las transacciones económicas sigan siendo de fiar.',
  },
  {
    icon: FileCheck2,
    title: 'Integridad verificable',
    desc: 'El repositorio de la tarea y las dependencias descargadas durante la fase SETUP se comprueban por hash antes de ejecutarse. Nada se ejecuta sin pasar antes por esa verificación.',
  },
]

export default function Security() {
  const { ref, isVisible } = useReveal()
  return (
    <section id="seguridad" className="section security circuit-grid">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">05 // Seguridad</span>
          <h2 className="section-title">Ejecutar código de un desconocido, sin miedo</h2>
          <p className="section-kicker">
            La mayoría de plataformas similares ejecutan primero en local y aíslan después.
            Synergia parte de la premisa contraria: si no hay virtualización disponible, la
            tarea no se ejecuta.
          </p>
        </div>

        <div className="security__grid">
          {LAYERS.map((l, i) => (
            <SecurityCard key={l.title} layer={l} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SecurityCard({ layer, delay }) {
  const { ref, isVisible } = useReveal()
  const Icon = layer.icon
  return (
    <div
      ref={ref}
      className={`security-card reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="security-card__corner security-card__corner--tl" />
      <span className="security-card__corner security-card__corner--tr" />
      <span className="security-card__corner security-card__corner--bl" />
      <span className="security-card__corner security-card__corner--br" />
      <div className="security-card__icon">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3>{layer.title}</h3>
      <p>{layer.desc}</p>
    </div>
  )
}
