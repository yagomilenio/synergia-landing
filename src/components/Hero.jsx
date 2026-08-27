import { useTypewriter } from '../hooks/useTypewriter'
import { SITE } from '../siteConfig'
import './Hero.css'

const BOOT_LINES = [
  '[ OK ] auth: OAuth2 + verificación SMTP local',
  '[ OK ] broker: RabbitMQ / AMQP conectado',
  '[ OK ] aislamiento: namespaces + cgroups + iptables',
  '[ .. ] repositorio de tarea: parseando config.toml',
  '[ OK ] bloques repartidos entre 3 workers activos',
  '[ OK ] verificación cruzada: resultado canónico confirmado',
]

export default function Hero() {
  const { output } = useTypewriter(
    'Convierte hardware inactivo en potencia de cómputo intercambiable.',
    { speed: 26, startDelay: 500 }
  )

  return (
    <section id="top" className="hero circuit-grid">
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />
      <div className="hero__glow hero__glow--c" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow">PLATAFORMA DE CÓMPUTO DISTRIBUIDO</span>

          <h1 className="hero__title">
            <span className="glitch-text" data-text="SYNERGIA">SYNERGIA</span>
          </h1>

          <p className="hero__subtitle">
            <span className="hero__prompt">&gt;</span> {output}
            <span className="cursor-blink" aria-hidden="true" />
          </p>

          <p className="hero__desc">
            Publica tareas computacionalmente costosas como un repositorio de GitHub.
            Cualquier nodo de la red puede procesarlas de forma aislada y segura, y a cambio
            recibe créditos que luego canjea para ejecutar sus propias tareas. Sin alquilar
            un solo servidor en la nube.
          </p>

          <div className="hero__actions">
            <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="btn">
              Ver servidor
            </a>
            <a href={SITE.clientRepoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Ver cliente CLI
            </a>
            <a href="#documentacion" className="btn btn--ghost">
              Documentación ↓
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>40–60%</strong>
              <span>de CPU doméstica está infrautilizada</span>
            </div>
            <div>
              <strong>0</strong>
              <span>servidores propios necesarios</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>tareas ejecutadas en contenedores</span>
            </div>
          </div>
        </div>

        <div className="hero__panel chamfer" aria-hidden="true">
          <div className="hero__panel-header">
            <span className="hero__dot hero__dot--r" />
            <span className="hero__dot hero__dot--y" />
            <span className="hero__dot hero__dot--g" />
            <span className="hero__panel-title">nodo_worker.log</span>
          </div>
          <div className="hero__panel-body">
            {BOOT_LINES.map((line, i) => (
              <p
                key={line}
                className="hero__log-line"
                style={{ animationDelay: `${1.1 + i * 0.35}s` }}
              >
                {line}
              </p>
            ))}
            <p className="hero__log-line hero__log-line--prompt" style={{ animationDelay: `${1.1 + BOOT_LINES.length * 0.35}s` }}>
              <span className="hero__prompt">$</span> esperando siguiente bloque
              <span className="cursor-blink" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
