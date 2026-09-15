import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './Problem.css'

export default function Problem() {
  const { ref, isVisible } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  return (
    <section id="problema" className="section problem">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">{t.problem.eyebrow}</span>
          <h2 className="section-title">
            {t.problem.title}
          </h2>
          <p className="section-kicker">
            {t.problem.kicker}
          </p>
        </div>

        <div className="problem__grid">
          {t.problem.facts.map((f, i) => (
            <FactCard key={f.tag} fact={f} delay={i * 0.08} />
          ))}
        </div>

        <div className="problem__quote">
          <p className="problem__quote-strong">
            <strong>{t.problem.quote_strong}</strong>
          </p>
          <p className="problem__quote-body">
            {t.problem.quote_body}
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
