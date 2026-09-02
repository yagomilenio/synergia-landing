import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './EconomicModel.css'

export default function EconomicModel() {
  const { ref: refCopy, isVisible: isVisibleCopy } = useReveal()
  const { ref: refGrid, isVisible: isVisibleGrid } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  return (
    <section id="economia" className="section economic circuit-grid">
      <div className="container">
        
        {/* Encabezado: Economía de Reciprocidad */}
        <div className={`economic__header reveal ${isVisibleCopy ? 'is-visible' : ''}`} ref={refCopy}>
          <span className="eyebrow">{t.economics.eyebrow}</span>
          <h2 className="section-title">{t.economics.title}</h2>
          <p className="section-kicker">
            {t.economics.kicker}
          </p>
        </div>

        {/* Cuadro Comparativo de Flujo y Modelo Operativo */}
        <div className={`economic__main-grid reveal ${isVisibleGrid ? 'is-visible' : ''}`} ref={refGrid}>
          
          {/* Panel Izquierdo: El Ciclo de Reciprocidad */}
          <div className="economic__flow-card chamfer">
            <div className="economic__flow-header">
              <span className="flow-badge">{t.economics.badge_cycle}</span>
            </div>
            
            <div className="flow-steps">
              <div className="flow-step">
                <div className="flow-step-num font-display">1</div>
                <div className="flow-step-content">
                  <strong>{t.economics.flow_steps[0].title}</strong>
                  <p>{t.economics.flow_steps[0].desc}</p>
                </div>
              </div>
              
              <div className="flow-arrow">↓</div>
              
              <div className="flow-step">
                <div className="flow-step-num font-display" style={{ borderColor: 'var(--accent-secondary)' }}>2</div>
                <div className="flow-step-content">
                  <strong>{t.economics.flow_steps[1].title}</strong>
                  <p>{t.economics.flow_steps[1].desc}</p>
                </div>
              </div>
              
              <div className="flow-arrow">↓</div>
              
              <div className="flow-step">
                <div className="flow-step-num font-display" style={{ borderColor: 'var(--accent-tertiary)' }}>3</div>
                <div className="flow-step-content">
                  <strong>{t.economics.flow_steps[2].title}</strong>
                  <p>{t.economics.flow_steps[2].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Comparativa de Modelo */}
          <div className="economic__comparison-card chamfer">
            <div className="economic__comparison-header">
              <span className="comparison-badge">{t.economics.badge_efficiency}</span>
            </div>
            
            <div className="comparison-grid">
              <div className="comparison-col comparison-col--cloud">
                <div className="comparison-col-header">
                  <strong>{t.economics.traditional_cloud}</strong>
                </div>
                <ul className="comparison-list">
                  {t.economics.traditional_list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="comparison-col comparison-col--synergia">
                <div className="comparison-col-header">
                  <strong>{t.economics.synergia_network}</strong>
                </div>
                <ul className="comparison-list">
                  {t.economics.synergia_list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pilares de Sostenibilidad y Confianza */}
        <div className="economic__pillars">
          <div className="economic-pillar chamfer-sm">
            <div className="pillar-glow font-display">01</div>
            <h4>{t.economics.pillar1_title}</h4>
            <p>
              {t.economics.pillar1_desc}
            </p>
          </div>

          <div className="economic-pillar economic-pillar--secondary chamfer-sm">
            <div className="pillar-glow font-display" style={{ color: 'var(--accent-secondary)' }}>02</div>
            <h4>{t.economics.pillar2_title}</h4>
            <p>
              {t.economics.pillar2_desc}
            </p>
          </div>

          <div className="economic-pillar economic-pillar--tertiary chamfer-sm">
            <div className="pillar-glow font-display" style={{ color: 'var(--accent-tertiary)' }}>03</div>
            <h4>{t.economics.pillar3_title}</h4>
            <p>
              {t.economics.pillar3_desc}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
