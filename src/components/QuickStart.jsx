import { useReveal } from '../hooks/useReveal'
import { Terminal, Shield, Play } from 'lucide-react'
import './QuickStart.css'

export default function QuickStart() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="guia-rapida" className="section quickstart circuit-grid">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">04 // Inicio Rápido</span>
          <h2 className="section-title">Empieza a Contribuir en 3 Pasos</h2>
          <p className="section-kicker">
            No necesitas configuraciones tediosas ni infraestructuras complejas. Instala el cliente oficial, apunta de forma obligatoria al servidor de tu elección, autentícate y empieza a procesar tareas en segundos.
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
              <h3>Instala el Cliente CLI</h3>
              <p>Descarga e instala la herramienta interactiva del cliente en tu sistema de forma global directamente desde PyPI.</p>
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
              <h3>Configura el Servidor</h3>
              <p>
                Al ser un protocolo descentralizado, debes definir los endpoints de conexión en tu configuración local. Tienes la libertad absoluta de configurar cualquier servidor donde decidas hospedar tu propio nodo.
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
            </div>
          </div>

          {/* Paso 3 */}
          <div className="quickstart__card chamfer-sm">
            <div className="quickstart__step-num font-display">03</div>
            <div className="quickstart__card-content">
              <div className="quickstart__icon-wrap" style={{ color: 'var(--accent-tertiary)' }}>
                <Play size={18} />
              </div>
              <h3>Autenticación y Ejecución</h3>
              <p>Inicia sesión al instante de forma segura utilizando tu proveedor preferido (GitHub, Google o tu credencial de correo local) y lánzate de fondo a procesar la simulación de Stanford de plegado de proteínas.</p>
            </div>
            <div className="quickstart__card-code-container">
              <span className="quickstart__card-code-tab" style={{ color: 'var(--accent-tertiary)', background: 'rgba(0, 240, 255, 0.04)', borderColor: 'rgba(0, 240, 255, 0.15)' }}>Terminal</span>
              <pre className="quickstart__code font-body" style={{ borderColor: 'rgba(0, 240, 255, 0.25)' }}>
                <code>{`synergia login-github\nsynergia subscribe-task --task-id foldingathomesynergia`}</code>
              </pre>
              <a href="/docs/cli/#comandos-de-autenticación-y-cuentas" className="quickstart__doc-link">
                Ver todos los métodos de autenticación (Google, GitHub, email) →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}