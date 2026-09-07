import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import { Calculator, ArrowRight, ShieldCheck, HeartHandshake, Coins } from 'lucide-react'
import './EconomicTeaser.css'

export default function EconomicTeaser() {
  const { ref: refHeader, isVisible: isVisibleHeader } = useReveal()
  const { ref: refCards, isVisible: isVisibleCards } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  return (
    <section id="economia" className="section economic-teaser circuit-grid">
      <div className="container">
        {/* Encabezado */}
        <div className={`economic-teaser__header reveal ${isVisibleHeader ? 'is-visible' : ''}`} ref={refHeader}>
          <span className="eyebrow">{t.economics.eyebrow}</span>
          <h2 className="section-title">{t.economics.title}</h2>
          <p className="section-kicker">
            {t.economics.kicker}
          </p>
        </div>

        {/* Retícula del Ciclo de Reciprocidad */}
        <div className={`economic-teaser__grid reveal ${isVisibleCards ? 'is-visible' : ''}`} ref={refCards}>
          <div className="economic-teaser__card chamfer-sm">
            <div className="economic-teaser__card-icon">
              <HeartHandshake size={24} strokeWidth={1.5} />
            </div>
            <h4>{lang === 'es' ? '1. Aportación de Recursos' : '1. Resource Contribution'}</h4>
            <p>
              {lang === 'es' 
                ? 'El nodo worker aporta ciclos útiles de hardware (CPU, RAM o GPU) para ejecutar tareas activas de la red o la Tarea Génesis (Folding@Home).'
                : 'The worker node contributes useful hardware cycles (CPU, RAM, or GPU) to process active tasks or the common-good Genesis Task (Folding@Home).'}
            </p>
          </div>

          <div className="economic-teaser__card chamfer-sm">
            <div className="economic-teaser__card-icon" style={{ color: 'var(--accent-secondary)' }}>
              <Coins size={24} strokeWidth={1.5} />
            </div>
            <h4>{lang === 'es' ? '2. Liquidación por Trabajo' : '2. Work Settlement'}</h4>
            <p>
              {lang === 'es' 
                ? 'El servidor de coordinación valida el trabajo por consenso y transfiere créditos inconvertibles directamente de la cuenta del publisher al worker.'
                : 'The coordination server validates the work by consensus and transfers inconvertible credits directly from the publisher’s account to the worker.'}
            </p>
          </div>

          <div className="economic-teaser__card chamfer-sm">
            <div className="economic-teaser__card-icon" style={{ color: 'var(--accent-tertiary)' }}>
              <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
            <h4>{lang === 'es' ? '3. Publicación sin Coste' : '3. Cost-free Publication'}</h4>
            <p>
              {lang === 'es' 
                ? 'Los créditos acumulados se canjean para publicar tareas propias (Publishers) de forma gratuita, distribuyendo el cálculo entre la red de workers.'
                : 'Accumulated credits are redeemed to publish custom tasks (Publishers) for free, distributing the workload across the worker network.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}