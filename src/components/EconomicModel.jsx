import { useReveal } from '../hooks/useReveal'
import './EconomicModel.css'

const TERMS = [
  {
    term: 'crédito',
    type: 'unidad de intercambio',
    def: 'No tiene valor monetario externo, no es una criptomoneda y no se canjea por dinero real. Representa capacidad de cómputo aportada a la red.',
  },
  {
    term: 'reputación',
    type: 'valor de confianza',
    def: 'Se recalcula tras cada cambio de resultado canónico. Penaliza a los workers cuyos resultados son sustituidos por los de otros nodos y premia la consistencia.',
  },
  {
    term: 'verificación_cruzada',
    type: 'mecanismo antifraude',
    def: 'Dos nodos independientes procesan los mismos bloques. Si sus resultados coinciden por hash SHA-256, el resultado se acepta como válido.',
  },
  {
    term: 'resultado_canónico',
    type: 'estado del proceso',
    def: 'El resultado verificado y aceptado para un proceso concreto, establecido por consenso entre las ejecuciones de distintos nodos.',
  },
]

export default function EconomicModel() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="economia" className="section economic circuit-grid">
      <div className="container economic__grid">
        <div className={`economic__copy reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">03 // Modelo económico</span>
          <h2 className="section-title">Una economía de créditos, no una blockchain</h2>
          <p className="section-kicker">
            Synergia acredita créditos a los usuarios en función del coste computacional
            aportado. Esos créditos se usan después para publicar tareas propias, permitiendo
            el intercambio directo de capacidad de cómputo sin comprar hardware.
          </p>

          <div className="economic__callout chamfer-sm">
            <strong>¿Por qué no blockchain?</strong>
            <p>
              Un sistema descentralizado habría exigido gestionar wallets, comisiones de red
              y consenso distribuido, sin aportar nada al problema real: repartir cómputo de
              forma justa. Al mantener un punto de control centralizado, Synergia elimina esa
              complejidad operacional sin perder el mecanismo que sí importa — la verificación
              cruzada de resultados.
            </p>
          </div>
        </div>

        <div className="economic__terminal chamfer">
          <div className="economic__terminal-header">
            <span className="hero__prompt">$</span> man synergia-economia
          </div>
          <dl className="economic__list">
            {TERMS.map((t) => (
              <TermRow key={t.term} t={t} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function TermRow({ t }) {
  const { ref, isVisible } = useReveal()
  return (
    <div ref={ref} className={`economic__term reveal ${isVisible ? 'is-visible' : ''}`}>
      <dt>
        <span className="economic__term-name">{t.term}</span>
        <span className="economic__term-type">{t.type}</span>
      </dt>
      <dd>{t.def}</dd>
    </div>
  )
}
