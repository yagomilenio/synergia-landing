import { useReveal } from '../hooks/useReveal'
import { Terminal, Shield, Play } from 'lucide-react'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './QuickStart.css'

export default function QuickStart() {
  const { ref, isVisible } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  return (
    <section id="guia-rapida" className="section quickstart circuit-grid">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">{t.quickstart.eyebrow}</span>
          <h2 className="section-title">{t.quickstart.title}</h2>
          <p className="section-kicker">
            {t.quickstart.kicker}
          </p>
        </div>

        <div className="quickstart__grid">
          {/* Paso 1 */}
          <div className="quickstart__card chamfer-sm">
            <div className="quickstart__step-num font-display">01</div>
            <div className="quickstart__card-content">
              <div className="quickstart__icon-wrap">
                <Terminal size={18} />
              </div>
              <h3>{t.quickstart.step1_title}</h3>
              <p>{t.quickstart.step1_desc}</p>
            </div>
            <div className="quickstart__card-code-container">
              <span className="quickstart__card-code-tab">Terminal</span>
              <pre className="quickstart__code font-body">
                <code>{`pip install synergia`}</code>
              </pre>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="quickstart__card chamfer-sm">
            <div className="quickstart__step-num font-display">02</div>
            <div className="quickstart__card-content">
              <div className="quickstart__icon-wrap" style={{ color: 'var(--accent-secondary)' }}>
                <Shield size={18} />
              </div>
              <h3>{t.quickstart.step2_title}</h3>
              <p>
                {t.quickstart.step2_desc}
              </p>
            </div>
            <div className="quickstart__card-code-container">
              <span className="quickstart__card-code-tab" style={{ color: 'var(--accent-secondary)', background: 'rgba(140, 0, 240, 0.04)', borderColor: 'rgba(140, 0, 240, 0.15)' }}>~/.config/synergia/config.ini</span>
              <pre className="quickstart__code font-body" style={{ borderColor: 'rgba(140, 0, 240, 0.25)' }}>
                <code>{`cat > ~/.config/synergia/config.ini <<'EOF'
[rest]
base_url = https://{rest-endpoint}
base_port = 443

[ws]
base_url = wss://{websocket-endpoint}
base_port = 443
EOF`}</code>
              </pre>
              <a href="/docs/configuracion-servidor/" className="quickstart__doc-link">
                {t.quickstart.step2_link}
              </a>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="quickstart__card chamfer-sm">
            <div className="quickstart__step-num font-display">03</div>
            <div className="quickstart__card-content">
              <div className="quickstart__icon-wrap" style={{ color: 'var(--accent-tertiary)' }}>
                <Play size={18} />
              </div>
              <h3>{t.quickstart.step3_title}</h3>
              <p>{t.quickstart.step3_desc}</p>
            </div>
            <div className="quickstart__card-code-container">
              <span className="quickstart__card-code-tab" style={{ color: 'var(--accent-tertiary)', background: 'rgba(0, 240, 255, 0.04)', borderColor: 'rgba(0, 240, 255, 0.15)' }}>Terminal</span>
              <pre className="quickstart__code font-body" style={{ borderColor: 'rgba(0, 240, 255, 0.25)' }}>
                <code>{`# Autenticación rápida / Quick authentication
synergia login-github

# Suscríbete y empieza a procesar bloques / Subscribe and process chunks
synergia subscribe-task --task-id foldingathomesynergia`}</code>
              </pre>
              <a href="/docs/cli/#comandos-de-autenticación-y-cuentas" className="quickstart__doc-link">
                {t.quickstart.step3_link}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
