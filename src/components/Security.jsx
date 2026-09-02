import { Box, ShieldCheck, KeyRound, FileCheck2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './Security.css'

const ICONS = [Box, ShieldCheck, KeyRound, FileCheck2]

export default function Security() {
  const { ref, isVisible } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  const LAYERS = t.security.features.map((item, i) => ({
    icon: ICONS[i],
    title: item.title,
    desc: item.desc,
  }))

  return (
    <section id="seguridad" className="section security circuit-grid">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">{t.security.eyebrow}</span>
          <h2 className="section-title">{t.security.title}</h2>
          <p className="section-kicker">
            {t.security.kicker}
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
      className={`security-card chamfer-sm reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="security-card__icon">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3>{layer.title}</h3>
      <p>{layer.desc}</p>
    </div>
  )
}
