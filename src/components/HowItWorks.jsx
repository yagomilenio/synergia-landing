import { useReveal } from '../hooks/useReveal'
import './HowItWorks.css'

const STEPS = [
  {
    n: '01',
    title: 'Publica la tarea',
    code: 'repo/Makefile · repo/config.toml',
    desc: 'Cualquier repositorio de GitHub puede convertirse en una tarea. Solo necesita un Makefile con los targets setup, run y clean, y un config.toml con las secciones [inputs], [runner] y [outputs] que describen de dónde vienen los datos, cómo lanzar el comando y dónde escribir los resultados.',
  },
  {
    n: '02',
    title: 'Se reparte en bloques',
    code: 'asignación dinámica → N workers',
    desc: 'Si la tarea tiene entradas, la plataforma las agrupa en bloques y las reparte de forma equitativa entre los nodos activos. Las tareas dinámicas —como consultas a un LLM— aceptan entradas nuevas en tiempo real.',
  },
  {
    n: '03',
    title: 'Un worker la ejecuta, aislada',
    code: 'namespaces · cgroups · iptables',
    desc: 'El código se ejecuta dentro de un contenedor, sin acceso al sistema anfitrión. Los dominios de red permitidos están restringidos y se verifica la integridad del repositorio y de las dependencias descargadas.',
  },
  {
    n: '04',
    title: 'El resultado se verifica en cruzado',
    code: 'SHA-256 · resultado canónico',
    desc: 'Para tareas deterministas, dos nodos independientes deben producir el mismo resultado para que este se acepte como canónico. Así se detectan ejecuciones fraudulentas o modificaciones maliciosas.',
  },
  {
    n: '05',
    title: 'Se liquidan créditos y reputación',
    code: '+crédito · +reputación',
    desc: 'Quien procesó el bloque cobra créditos según el coste computacional aportado. Esos créditos se canjean después para publicar tareas propias, incluso las que exigen GPU.',
  },
]

export default function HowItWorks() {
  return (
    <section id="funcionamiento" className="section howitworks">
      <div className="container">
        <SectionIntro />
        <div className="timeline">
          <div className="timeline__rail" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionIntro() {
  const { ref, isVisible } = useReveal()
  return (
    <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
      <span className="eyebrow">02 // Funcionamiento</span>
      <h2 className="section-title">De un repositorio de GitHub a un resultado verificado</h2>
      <p className="section-kicker">
        Cinco pasos, siempre en este orden. Sin infraestructura propia ni wrappers específicos
        del lenguaje: si tu código corre en un Makefile, corre en Synergia.
      </p>
    </div>
  )
}

function Step({ step, index }) {
  const { ref, isVisible } = useReveal()
  const align = index % 2 === 0 ? 'left' : 'right'
  return (
    <div
      ref={ref}
      className={`timeline__step timeline__step--${align} reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="timeline__node" aria-hidden="true">{step.n}</div>
      <div className="timeline__card chamfer-sm">
        <span className="timeline__card-code">{step.code}</span>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    </div>
  )
}
