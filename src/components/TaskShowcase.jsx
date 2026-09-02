import { Box, KeyRound, BrainCircuit, Dna } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import ImagePanel from './ImagePanel'
import './TaskShowcase.css'

const ICONS = [Box, KeyRound, BrainCircuit, Dna]
const ACCENTS = ['accent', 'accent-secondary', 'accent-tertiary', 'accent']
const IMAGES = ['task-blender.png', 'task-cracker.png', 'task-llm.png', 'task-foldingathome.png']
const REPO_URLS = [
  'https://github.com/yagomilenio/blender-render-task',
  'https://github.com/yagomilenio/yescrypt_task_cracker',
  'https://github.com/yagomilenio/ollama-llm-task',
  'https://github.com/yagomilenio/foldingathomesynergia',
]

export default function TaskShowcase() {
  const { ref, isVisible } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  const TASKS = t.showcase.items.map((item, i) => ({
    icon: ICONS[i],
    name: i === 0 ? 'blender-render-task' : i === 1 ? 'yescrypt_task_cracker' : i === 2 ? 'ollama-llm-task' : 'foldingathomesynergia',
    kind: i === 0 ? (lang === 'es' ? 'Renderizado 3D' : '3D Rendering') : i === 1 ? (lang === 'es' ? 'Criptografía' : 'Cryptography') : i === 2 ? (lang === 'es' ? 'Inferencia LLM' : 'LLM Inference') : (lang === 'es' ? 'Biomedicina · tarea génesis' : 'Biomedicine · genesis task'),
    desc: item.desc,
    accent: ACCENTS[i],
    image: IMAGES[i],
    repoUrl: REPO_URLS[i],
  }))

  return (
    <section id="tareas" className="section tasks">
      <div className="container">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`} ref={ref}>
          <span className="eyebrow">{t.showcase.eyebrow}</span>
          <h2 className="section-title">{t.showcase.title}</h2>
          <p className="section-kicker">
            {t.showcase.kicker}
          </p>
        </div>

        <div className="tasks__grid">
          {TASKS.map((t, idx) => (
            <TaskCard key={t.name} task={t} linkLabel={TRANSLATIONS[lang].showcase.card_link} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TaskCard({ task, linkLabel }) {
  const { ref, isVisible } = useReveal()
  const Icon = task.icon
  return (
    <a
      ref={ref}
      href={task.repoUrl}
      target="_blank"
      rel="noreferrer"
      className={`task-card chamfer-sm reveal ${isVisible ? 'is-visible' : ''}`}
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
    </a>
  )
}
