import { useState, useEffect } from 'react'
import { Github, BookOpen } from 'lucide-react'
import { SITE } from '../siteConfig'
import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './Footer.css'

export default function Footer({ hideCTA = false }) {
  const { ref, isVisible } = useReveal()
  const [theme, setTheme] = useState('dark')
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  useEffect(() => {
    // Initial theme setup
    const savedTheme = localStorage.getItem('starlight-theme') || 'dark'
    setTheme(savedTheme)

    // Listen to theme changes on html [data-theme] attribute
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
      setTheme(currentTheme)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => observer.disconnect()
  }, [])

  return (
    <footer className="footer">
      {!hideCTA && (
        <div ref={ref} className={`footer__cta reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="container">
            <h2 className="footer__cta-title">{t.footer.cta_title}</h2>
            <p>
              {t.footer.cta_desc} {SITE.license}.
            </p>
            <div className="footer__cta-actions">
              <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="btn">
                <Github size={16} strokeWidth={1.5} /> {t.footer.cta_btn_server}
              </a>
              <a href={SITE.clientRepoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
                <Github size={16} strokeWidth={1.5} /> {t.footer.cta_btn_client}
              </a>
              <a href="https://yagomilenio.github.io/synergia-docs/docs/introduccion/" target="_blank" rel="noreferrer" className="btn btn--ghost">
                <BookOpen size={16} strokeWidth={1.5} /> {t.footer.cta_btn_docs}
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="footer__bottom">
        <div className="footer__meta">
          <div className="footer__brand">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Synergia" className="footer__brand-logo footer__brand-logo--light" />
            <img src={`${import.meta.env.BASE_URL}logo-dark.jpg`} alt="Synergia" className="footer__brand-logo footer__brand-logo--dark" />
          </div>
          <p>{t.footer.brand_desc}</p>
          <p>Licencia {SITE.license} · {t.footer.brand_license_sep}</p>
          <p className="footer__policy-links">
            <a href={`${import.meta.env.BASE_URL}privacidad/`}>{t.footer.brand_policy}</a> ·{' '}
            <a href={`${import.meta.env.BASE_URL}terminos/`}>{t.footer.brand_terms}</a>
          </p>
        </div>
        <div className="footer__credits">
          <p><span>{t.footer.credits_author}</span> {SITE.author}</p>
          <p><span>{t.footer.credits_github}</span> <a href={SITE.authorGithub} target="_blank" rel="noreferrer">{SITE.authorGithub.replace('https://', '')}</a></p>
        </div>
      </div>
    </footer>
  )
}
