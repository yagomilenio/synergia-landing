import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './Comparison.css'

function cellClass(value) {
  if (value === 'Sí' || value === 'Yes') return 'cell--yes'
  if (value === 'No') return 'cell--no'
  if (value === 'Parcial' || value === 'Partial') return 'cell--partial'
  return 'cell--neutral'
}

export default function Comparison() {
  const { ref, isVisible } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  const COLUMNS = t.comparison.cols
  const ROWS = t.comparison.rows

  return (
    <section id="comparativa" className="section comparison">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">{t.comparison.eyebrow}</span>
          <h2 className="section-title">{t.comparison.title}</h2>
          <p className="section-kicker">
            {t.comparison.kicker}
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

        {/* Mobile View: Responsive Cards Layout */}
        <div className="comparison__mobile-cards">
          {ROWS.map((row) => (
            <div key={row[0]} className={`comparison__mobile-card ${row[0] === 'Synergia' ? 'comparison__mobile-card--highlight' : ''}`}>
              <div className="comparison__mobile-card-header">
                <span className="comparison__mobile-card-title">{row[0]}</span>
                {row[0] === 'Synergia' && <span className="comparison__mobile-card-tag">{t.comparison.highlight_tag}</span>}
              </div>
              <div className="comparison__mobile-card-body">
                {COLUMNS.slice(1).map((col, idx) => {
                  const cellValue = row[idx + 1];
                  return (
                    <div key={col} className="comparison__mobile-row">
                      <span className="comparison__mobile-label">{col}</span>
                      <span className={`comparison__mobile-value ${cellClass(cellValue)}`}>{cellValue}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="comparison__note" dangerouslySetInnerHTML={{ __html: t.comparison.note }} />
      </div>
    </section>
  )
}
