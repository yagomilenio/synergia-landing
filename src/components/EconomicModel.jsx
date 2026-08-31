import { useReveal } from '../hooks/useReveal'
import './EconomicModel.css'

export default function EconomicModel() {
  const { ref: refCopy, isVisible: isVisibleCopy } = useReveal()
  const { ref: refGrid, isVisible: isVisibleGrid } = useReveal()

  return (
    <section id="economia" className="section economic circuit-grid">
      <div className="container">
        
        {/* Encabezado: Economía de Reciprocidad */}
        <div className={`economic__header reveal ${isVisibleCopy ? 'is-visible' : ''}`} ref={refCopy}>
          <span className="eyebrow">03 // Modelo Económico y Reciprocidad</span>
          <h2 className="section-title">Intercambio Justo de Capacidad de Cómputo</h2>
          <p className="section-kicker">
            El cómputo no surge de la nada: se sostiene con trabajo real. Synergia implementa una economía 
            circular donde aportas ciclos cuando tu hardware está inactivo y los recuperas multiplicados en 
            forma de potencia masiva en paralelo cuando necesitas lanzar tus propios proyectos.
          </p>
        </div>

        {/* Cuadro Comparativo de Flujo y Modelo Operativo */}
        <div className={`economic__main-grid reveal ${isVisibleGrid ? 'is-visible' : ''}`} ref={refGrid}>
          
          {/* Panel Izquierdo: El Ciclo de Reciprocidad */}
          <div className="economic__flow-card chamfer">
            <div className="economic__flow-header">
              <span className="flow-badge">CICLO DE RECIPROCIDAD</span>
            </div>
            
            <div className="flow-steps">
              <div className="flow-step">
                <div className="flow-step-num font-display">1</div>
                <div className="flow-step-content">
                  <strong>Aportas capacidad de cómputo</strong>
                  <p>Tu nodo procesa bloques de trabajo a demanda o de forma adaptativa cuando el equipo esté libre.</p>
                </div>
              </div>
              
              <div className="flow-arrow">↓</div>
              
              <div className="flow-step">
                <div className="flow-step-num font-display" style={{ borderColor: 'var(--accent-secondary)' }}>2</div>
                <div className="flow-step-content">
                  <strong>Consolidas Créditos</strong>
                  <p>Cada cálculo validado por consenso matemático suma saldo a tu cuenta.</p>
                </div>
              </div>
              
              <div className="flow-arrow">↓</div>
              
              <div className="flow-step">
                <div className="flow-step-num font-display" style={{ borderColor: 'var(--accent-tertiary)' }}>3</div>
                <div className="flow-step-content">
                  <strong>Despliegas en Horas Pico</strong>
                  <p>Canjeas tus créditos para ejecutar tus tareas en cientos de nodos globales.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Comparativa de Modelo */}
          <div className="economic__comparison-card chamfer">
            <div className="economic__comparison-header">
              <span className="comparison-badge">EFICIENCIA OPERATIVA</span>
            </div>
            
            <div className="comparison-body">
              <div className="comparison-row comparison-row--cloud">
                <div className="comparison-row-meta">
                  <strong>ALQUILER TRADICIONAL</strong>
                  <ul className="comparison-list">
                    <li>Facturación monetaria fija recurrente.</li>
                    <li>Cobro por horas, uses o no la máquina.</li>
                    <li>Gastos operativos continuos.</li>
                  </ul>
                </div>
              </div>

              <div className="comparison-divider">VS</div>

              <div className="comparison-row comparison-row--synergia">
                <div className="comparison-row-meta">
                  <strong>RED SYNERGIA</strong>
                  <ul className="comparison-list">
                    <li>Pago mediante potencia de cómputo.</li>
                    <li>Procesamiento a demanda o en periodos de inactividad.</li>
                    <li>Rentabilidad del hardware propio.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pilares de Sostenibilidad y Confianza */}
        <div className="economic__pillars">
          <div className="economic-pillar chamfer-sm">
            <div className="pillar-glow font-display">01</div>
            <h4>Cero Especulación Financiera</h4>
            <p>
              Sin tokens volátiles, sin wallets complejas ni dinámicas de especulación. Un crédito en Synergia representa estrictamente una cantidad determinada de trabajo computacional útil verificado.
            </p>
          </div>

          <div className="economic-pillar economic-pillar--secondary chamfer-sm">
            <div className="pillar-glow font-display" style={{ color: 'var(--accent-secondary)' }}>02</div>
            <h4>Verificación y Consenso Antifraude</h4>
            <p>
              La red comprueba que los resultados de múltiples nodos sean matemáticamente idénticos antes de liquidar el saldo. Quien calcula de forma consistente acumula reputación.
            </p>
          </div>

          <div className="economic-pillar economic-pillar--tertiary chamfer-sm">
            <div className="pillar-glow font-display" style={{ color: 'var(--accent-tertiary)' }}>03</div>
            <h4>Rentabilidad del Hardware Existente</h4>
            <p>
              Ideal para centros de cálculo, universidades, empresas o desarrolladores independientes. Permite amortizar la inversión en GPUs y CPUs maximizando su tasa de utilización efectiva.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}