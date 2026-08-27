import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import './Navbar.css'
import { SITE } from '../siteConfig'

const LINKS = [
  { href: '#problema', label: 'Motivación' },
  { href: '#funcionamiento', label: 'Funcionamiento' },
  { href: '#economia', label: 'Economía' },
  { href: '#tareas', label: 'Tareas' },
  { href: '#seguridad', label: 'Seguridad' },
  { href: '#comparativa', label: 'Comparativa' },
  { href: '#documentacion', label: 'Documentación' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

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

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('starlight-theme', nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">
          <img src={theme === 'light' ? "/logo.jpg" : "/logo-dark.jpg"} alt="Synergia Logo" className="nav__brand-logo" />
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__cta">
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
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button onClick={toggleTheme} className="nav__mobile-theme-btn">
            {theme === 'light' ? 'Modo Oscuro 🌙' : 'Modo Claro ☀️'}
          </button>
          <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="nav__mobile-github">
            &gt; git clone {SITE.serverRepoUrl.replace('https://', '')}
          </a>
        </nav>
      )}
    </header>
  )
}
