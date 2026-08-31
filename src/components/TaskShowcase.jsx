import { Box, KeyRound, BrainCircuit, Dna } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import ImagePanel from './ImagePanel'
import './TaskShowcase.css'

const TASKS = [
  {
    icon: Box,
    name: 'blender-render-task',
    kind: 'Renderizado 3D',
    desc: 'Reparte el renderizado de una escena de Blender en fotogramas independientes entre los workers disponibles.',
    accent: 'accent',
    image: 'task-blender.png',
  },
  {
    icon: KeyRound,
    name: 'yescrypt_task_cracker',
    kind: 'Criptografía',
    desc: 'Distribuye el cracking de contraseñas por fuerza bruta usando yescrypt, dividiendo el espacio de búsqueda en bloques.',
    accent: 'accent-secondary',
    image: 'task-cracker.png',
  },
  {
    icon: BrainCircuit,
    name: 'ollama-llm-task',
    kind: 'Inferencia LLM',
    desc: 'Tarea dinámica: cada consulta al modelo de lenguaje se reparte en tiempo real entre los nodos con GPU disponible.',
    accent: 'accent-tertiary',
    image: 'task-llm.png',
  },
  {
    icon: Dna,
    name: 'foldingathomesynergia',
    kind: 'Biomedicina · tarea génesis',
    desc: 'Se apoya en Folding@Home (Stanford) para simular el plegado de proteínas y contribuir a investigación sobre cáncer, Alzheimer, COVID-19, diabetes, Huntington, influenza y Parkinson.',
    accent: 'accent',
    image: 'task-foldingathome.png',
  },
]

export default function TaskShowcase() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="tareas" className="section tasks">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">04 // Tareas de ejemplo</span>
          <h2 className="section-title">Cualquier Makefile es una tarea válida</h2>
          <p className="section-kicker">
            Estos son algunos de los repositorios de ejemplo incluidos en Synergia, pensados
            para cubrir distintos perfiles de carga: cómputo gráfico, criptografía, inferencia
            de modelos y ciencia colaborativa.
          </p>
        </div>

        <div className="tasks__grid">
          {TASKS.map((t) => (
            <TaskCard key={t.name} task={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TaskCard({ task }) {
  const { ref, isVisible } = useReveal()
  const Icon = task.icon
  return (
    <div
      ref={ref}
      className={`task-card chamfer-sm reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ '--task-accent': `var(--${task.accent})` }}
    >
      <ImagePanel src={task.image} alt={`Captura de la tarea ${task.name}`} label={task.name} className="task-card__image" />
      <div className="task-card__body">
        <div className="task-card__icon">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <span className="task-card__kind">{task.kind}</span>
        <h3 className="task-card__name">{task.name}</h3>
        <p>{task.desc}</p>
      </div>
    </div>
  )
}
