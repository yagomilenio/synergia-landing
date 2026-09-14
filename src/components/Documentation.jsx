import { BookOpen, Boxes, ShieldCheck, Database, Rocket, Terminal as TerminalIcon, Coins } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import { SITE } from '../siteConfig'
import './Documentation.css'

const ICONS = [Rocket, Boxes, ShieldCheck, Database, TerminalIcon, Coins]
const HREFS = [
  SITE.docs.primerosPasos,
  SITE.docs.arquitectura,
  SITE.docs.seguridad,
  SITE.docs.modeloDeDatos,
  SITE.docs.cliReference,
  SITE.docs.economicModel,
]

export default function Documentation() {
  const { ref, isVisible } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  const DOCS = t.docsSection.cards.map((card, i) => ({
    icon: ICONS[i],
    title: card.title,
    desc: card.desc,
    href: HREFS[i],
  }))

  return (
    <section id="documentacion" className="section documentation circuit-grid">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">{t.docsSection.eyebrow}</span>
          <h2 className="section-title">{t.docsSection.title}</h2>
          <p className="section-kicker">
            {t.docsSection.kicker}
          </p>
        </div>

        <div className="documentation__docs">
          {DOCS.map((d, i) => (
            <DocCard key={d.title} doc={d} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DocCard({ doc, delay }) {
  const { ref, isVisible } = useReveal()
  const Icon = doc.icon
  return (
    <a
      ref={ref}
      href={doc.href}
      target="_blank"
      rel="noreferrer"
      className={`doc-card chamfer-sm reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="doc-card__icon">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3>{doc.title}</h3>
      <p>{doc.desc}</p>
    </a>
  )
}
