import { BookOpen, Boxes, GitBranch, ShieldCheck, Database, Rocket, Wrench, Terminal as TerminalIcon, Radio, Coins } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../siteConfig'
import './Documentation.css'

const SERVER_STEPS = [
  '$ cp infra/docker/.env.example infra/docker/.env',
  '# rellena ORACLE_PASSWORD, JWT_SECRET_KEY, RABBITMQ_PASSWORD...',
  '$ docker compose -f infra/docker/docker-compose.yml up -d',
  '$ curl http://localhost:8000/metrics',
]

const CLIENT_STEPS = [
  '$ git clone ' + SITE.clientRepoUrl.replace('https://', '') + '.git',
  '$ cd synergia-client && pip install -e .',
  '$ synergia sign-up-user --username tu_usuario --email tu@mail.com --passwd ****',
  '$ synergia configure-device',
  '$ synergia find-task --status ACTIVE',
  '$ synergia subscribe-task --task-id 1',
]

const DOCS = [
  {
    icon: Boxes,
    title: 'Arquitectura del sistema',
    desc: 'Cómo encajan la API REST, la API WebSocket, la cola RabbitMQ y la base de datos Oracle.',
    href: SITE.docs.arquitectura,
  },
  {
    icon: GitBranch,
    title: 'Flujo de tareas',
    desc: 'El recorrido completo de una tarea: publicación, chunking en la cola, ejecución en el worker y verificación cruzada.',
    href: SITE.docs.flujoDeTareas,
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad y autenticación',
    desc: 'JWT, OAuth 2.0, Argon2, aislamiento por contenedor sin privilegios y wrappers de red auditados.',
    href: SITE.docs.seguridad,
  },
  {
    icon: Database,
    title: 'Modelo de datos',
    desc: 'Esquema entidad-relación completo, incluida la tabla blockchain inmutable de transferencias.',
    href: SITE.docs.modeloDeDatos,
  },
  {
    icon: Rocket,
    title: 'Guía de despliegue',
    desc: 'Puesta en marcha paso a paso con Docker Compose, desde cero hasta monitorización con Grafana.',
    href: SITE.docs.guiaDeDespliegue,
  },
  {
    icon: Wrench,
    title: 'Referencia de config.toml',
    desc: 'Todas las secciones reales: [task], [inputs], [requirements], [download], [hash], [network] y [outputs].',
    href: SITE.docs.configReference,
  },
  {
    icon: TerminalIcon,
    title: 'Referencia del CLI',
    desc: 'Los 23 comandos del cliente, con todos sus flags: autenticación, dispositivo, tareas, worker y scheduler.',
    href: SITE.docs.cliReference,
  },
  {
    icon: Radio,
    title: 'API REST y WebSocket',
    desc: 'Los 25 endpoints REST y el protocolo del canal WebSocket de asignación de trabajo, documentados uno a uno.',
    href: SITE.docs.apiReference,
  },
  {
    icon: Coins,
    title: 'Modelo económico a fondo',
    desc: 'La fórmula real de coste por CPU/RAM/GPU, el pago a resultados canónicos y el cálculo de reputación.',
    href: SITE.docs.economicModel,
  },
]

export default function Documentation() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="documentacion" className="section documentation circuit-grid">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">08 // Documentación y uso</span>
          <h2 className="section-title">De cero a tu primer nodo en la red</h2>
          <p className="section-kicker">
            El servidor y el cliente viven en repositorios separados, cada uno con su propio
            README, tests y documentación técnica. Aquí tienes el camino corto para levantar
            ambos.
          </p>
        </div>

        <div className="documentation__terminals">
          <Terminal title="synergia-server · docker compose" lines={SERVER_STEPS} href={SITE.serverRepoUrl} linkLabel="Guía de despliegue completa →" />
          <Terminal title="synergia-client · CLI" lines={CLIENT_STEPS} href={SITE.clientRepoUrl} linkLabel="Todos los comandos del cliente →" />
        </div>

        <div className="documentation__docs">
          {DOCS.map((d, i) => (
            <DocCard key={d.title} doc={d} delay={i * 0.05} />
          ))}
        </div>

        <p className="documentation__note">
          <BookOpen size={15} strokeWidth={1.5} />
          Toda la documentación técnica de fondo —API, CLI, config.toml, modelo económico y
          modelo de datos— vive en una <a href="/docs.html">página independiente</a>, separada
          de esta landing y contrastada línea a línea contra el código fuente de ambos
          repositorios.
        </p>
      </div>
    </section>
  )
}

function Terminal({ title, lines, href, linkLabel }) {
  const { ref, isVisible } = useReveal()
  return (
    <div ref={ref} className={`documentation__terminal chamfer reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="documentation__terminal-header">
        <span className="hero__dot hero__dot--r" />
        <span className="hero__dot hero__dot--y" />
        <span className="hero__dot hero__dot--g" />
        <span className="documentation__terminal-title">{title}</span>
      </div>
      <div className="documentation__terminal-body">
        {lines.map((line, i) => (
          <p key={i} className={line.startsWith('#') ? 'documentation__comment' : ''}>{line}</p>
        ))}
      </div>
      <a href={href} target="_blank" rel="noreferrer" className="documentation__terminal-link">
        {linkLabel}
      </a>
    </div>
  )
}

function DocCard({ doc, delay }) {
  const { ref, isVisible } = useReveal()
  const Icon = doc.icon
  return (
    <a
      ref={ref}
      href={doc.href}
      target="_blank"
      rel="noreferrer"
      className={`doc-card chamfer-sm reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="doc-card__icon">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3>{doc.title}</h3>
      <p>{doc.desc}</p>
    </a>
  )
}
