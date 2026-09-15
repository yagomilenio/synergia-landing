import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import './Navbar.css'
import { SITE } from '../siteConfig'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [lang, setLang] = useLanguage()
  const t = TRANSLATIONS[lang]

  const LINKS = [
    { href: '#problema', label: t.nav.why },
    { href: '#funcionamiento', label: t.nav.how },
    { href: '#tareas', label: t.nav.useCases },
    { href: '#seguridad', label: t.nav.security },
    { href: 'https://yagomilenio.github.io/synergia-docs/docs/introduccion/', label: t.nav.docs, external: true },
    { href: '#economia', label: t.nav.economics },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    
    // Initial theme setup
    const savedTheme = localStorage.getItem('starlight-theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('starlight-theme', nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#" className="nav__brand">
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Synergia Logo" className="nav__brand-logo nav__brand-logo--light" />
          <img src={`${import.meta.env.BASE_URL}logo-dark.jpg`} alt="Synergia Logo" className="nav__brand-logo nav__brand-logo--dark" />
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__cta">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="nav__lang-btn"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={toggleTheme}
            className="nav__theme-btn"
            aria-label="Cambiar modo de color"
            title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
          >
            {theme === 'light' ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
          </button>
          <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost nav__cta-btn">
            GitHub
          </a>
        </div>

        <button
          className="nav__burger"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="nav__mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); setOpen(false); }} className="nav__mobile-lang-btn">
            {lang === 'es' ? 'English' : 'Español'}
          </button>
          <button onClick={toggleTheme} className="nav__mobile-theme-btn">
            {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
          </button>
        </nav>
      )}
    </header>
  )
}
