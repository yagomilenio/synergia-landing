import { useState } from 'react'
import './ImagePanel.css'

/**
 * Muestra una imagen real desde /public/images/<src>.
 * Si el archivo todavía no existe (porque no lo has subido), muestra
 * un panel de "señal pendiente" en vez de romper el diseño.
 *
 * Coloca tus capturas en public/images/ con el nombre indicado en `src`.
 * Ver public/images/README-IMAGENES.md para el listado completo.
 */
export default function ImagePanel({ src, alt, label, variant = 'default', className = '' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`image-panel image-panel--${variant} chamfer ${className}`}>
      {!failed ? (
        <img
          src={`${import.meta.env.BASE_URL}images/${src}`}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="image-panel__pending">
          <span className="image-panel__pending-tag">SEÑAL_NO_ENCONTRADA</span>
          <span className="image-panel__pending-label">{label || alt}</span>
          <span className="image-panel__pending-path">/images/{src}</span>
        </div>
      )}
      <div className="image-panel__scan" aria-hidden="true" />
    </div>
  )
}
