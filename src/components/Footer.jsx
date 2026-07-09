import { Github, BookOpen } from 'lucide-react'
import { SITE } from '../siteConfig'
import { useReveal } from '../hooks/useReveal'
import './Footer.css'

export default function Footer() {
  const { ref, isVisible } = useReveal()
  return (
    <footer className="footer">
      <div className="container">
        <div ref={ref} className={`footer__cta chamfer reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="footer__cta-glow" aria-hidden="true" />
          <span className="eyebrow">// Fin de la transmisión</span>
          <h2 className="footer__cta-title">
            <span className="glitch-text" data-text="¿Lo revisamos a fondo?">¿Lo revisamos a fondo?</span>
          </h2>
          <p>
            El servidor y el cliente CLI son proyectos independientes, cada uno con su propio
            repositorio, documentación técnica y suite de tests. Todo el código es abierto bajo
            licencia {SITE.license}.
          </p>
          <div className="footer__cta-actions">
            <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="btn">
              <Github size={16} strokeWidth={1.5} /> Repositorio del servidor
            </a>
            <a href={SITE.clientRepoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              <Github size={16} strokeWidth={1.5} /> Repositorio del cliente
            </a>
            <a href="#documentacion" className="btn btn--magenta">
              <BookOpen size={16} strokeWidth={1.5} /> Documentación
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__meta">
            <p className="footer__brand">
              <span className="nav__brand-mark">&gt;_</span> SYNERGIA
            </p>
            <p>Plataforma de cómputo distribuido con verificación de resultados e incentivos por créditos.</p>
            <p>Licencia {SITE.license} · código abierto</p>
          </div>
          <div className="footer__credits">
            <p><span>Autor</span> {SITE.author}</p>
            <p><span>GitHub</span> <a href={SITE.authorGithub} target="_blank" rel="noreferrer">{SITE.authorGithub.replace('https://', '')}</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
