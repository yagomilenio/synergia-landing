import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">
          <span className="nav__brand-mark">&gt;_</span> SYNERGIA
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__cta">
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
          <a href={SITE.serverRepoUrl} target="_blank" rel="noreferrer" className="nav__mobile-github">
            &gt; git clone {SITE.serverRepoUrl.replace('https://', '')}
          </a>
        </nav>
      )}
    </header>
  )
}
