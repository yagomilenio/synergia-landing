# Synergia — Landing page

Landing page de **Synergia**, una plataforma de cómputo distribuido con verificación de
resultados y sistema de incentivos por créditos, construida en React + Vite con una
identidad visual cyberpunk/glitch.

Presenta el proyecto (motivación, funcionamiento, modelo económico, seguridad, comparativa
con otras plataformas y stack técnico) y enlaza a la documentación real de los dos
repositorios que lo componen: [synergia-server](https://github.com/yagomilenio/synergia-server)
y [synergia-client](https://github.com/yagomilenio/synergia-client).

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Antes de publicar

1. **Enlaces reales** — revisa `src/siteConfig.js`:
   - `serverRepoUrl` / `clientRepoUrl`: URLs de tus repositorios de Synergia.
   - `docs`: enlaces a los ficheros de `docs/` del repositorio del servidor. Si mueves o
     renombras esos ficheros, actualiza aquí las rutas.
2. **Capturas** — añade tus imágenes en `public/images/` siguiendo el listado de
   `public/images/README-IMAGENES.md`. La web funciona igualmente sin ellas (muestra un
   placeholder), así que puedes desplegar primero y completar después.
3. **`base` en `vite.config.js`** — debe coincidir con el nombre de tu repositorio:
   ```js
   base: '/nombre-exacto-del-repo/'
   ```
   Si vas a publicar en `tu-usuario.github.io` (repo raíz), usa `base: '/'`.

## Desplegar en GitHub Pages

### Opción A — GitHub Actions (recomendada)

Ya incluye el workflow `.github/workflows/deploy.yml`. Solo tienes que:

1. Subir este proyecto a un repositorio de GitHub, a la rama `main`.
2. En el repo: **Settings → Pages → Source → GitHub Actions**.
3. Cada `push` a `main` construye y publica automáticamente.

### Opción B — manual con `gh-pages`

```bash
npm run build
npm run deploy
```

Esto publica el contenido de `dist/` en la rama `gh-pages`. Después, en
**Settings → Pages → Source**, selecciona la rama `gh-pages`.

## Estructura

```
src/
  components/       un componente + su .css por sección
  hooks/            useReveal (scroll reveal), useTypewriter
  siteConfig.js     enlaces a los repos, autor y documentación — edítalo aquí
  index.css         tokens de diseño, resets, animaciones globales
public/images/      tus capturas (ver README-IMAGENES.md)
```

### Secciones de la página

| Sección | Contenido |
|---|---|
| Hero | Presentación y enlaces directos a ambos repositorios |
| Motivación | Por qué tiene sentido una red de cómputo voluntario |
| Funcionamiento | Los cinco pasos de una tarea, de publicación a verificación |
| Economía | Créditos, reputación y por qué no hay blockchain de por medio |
| Tareas | Ejemplos reales de tareas publicadas sobre Synergia |
| Seguridad | Aislamiento por contenedor, red restringida, autenticación |
| Comparativa | Frente a BOINC, Folding@Home, SETI y Golem Network |
| Stack | Tecnologías usadas en servidor y cliente |
| Documentación | Guía rápida de despliegue/uso + enlaces a `docs/` del servidor |

## Créditos

Proyecto personal de código abierto — [Yago Manuel Sánchez Moscoso](https://github.com/yagomilenio).
Licencia GPL-3.0 en ambos repositorios (servidor y cliente).
