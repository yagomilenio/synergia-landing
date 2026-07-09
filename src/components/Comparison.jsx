import { useReveal } from '../hooks/useReveal'
import './Comparison.css'

const COLUMNS = ['Plataforma', 'Incentivos', 'Tareas arbitrarias', 'Aislamiento', 'Verificación', 'Participación abierta', 'Orientación']

const ROWS = [
  ['BOINC', 'Cosmético', 'Parcial', 'Parcial', 'Sí', 'No', 'Científica'],
  ['Folding@Home', 'Cosmético', 'No', 'Parcial', '—', 'No', 'Científica biomédica'],
  ['SETI', 'Cosmético', 'No', 'Parcial', 'Sí', 'No', 'Científica astronómica'],
  ['Golem Network', 'Sí', 'Sí', 'Sí', 'Sí', 'Sí', 'General'],
  ['Synergia', 'Sí', 'Sí', 'Sí', 'Sí', 'Sí', 'General'],
]

function cellClass(value) {
  if (value === 'Sí') return 'cell--yes'
  if (value === 'No') return 'cell--no'
  if (value === 'Parcial') return 'cell--partial'
  return 'cell--neutral'
}

export default function Comparison() {
  const { ref, isVisible } = useReveal()
  return (
    <section id="comparativa" className="section comparison">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">06 // Estado del arte</span>
          <h2 className="section-title">Frente a BOINC, Folding@Home, SETI y Golem Network</h2>
          <p className="section-kicker">
            La mayoría de plataformas de cómputo distribuido o bien recompensan solo de forma
            cosmética, o bien exigen la complejidad de una red descentralizada. Synergia se
            queda con lo mejor de cada extremo: incentivos reales, sin blockchain.
          </p>
        </div>

        <div className="comparison__table-wrap">
          <table className="comparison__table">
            <thead>
              <tr>
                {COLUMNS.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row[0]} className={row[0] === 'Synergia' ? 'row--highlight' : ''}>
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? 'cell--platform' : cellClass(cell)}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="comparison__note">
          Escala cualitativa: <strong>Sí</strong> cumple el criterio por completo ·{' '}
          <strong>Parcial</strong> lo soporta con limitaciones relevantes ·{' '}
          <strong>No</strong> no lo soporta · <strong>—</strong> información no disponible.
        </p>
      </div>
    </section>
  )
}
