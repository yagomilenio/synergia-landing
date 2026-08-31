// Ajusta estos valores con tus datos reales antes de publicar.
export const SITE = {
  // Repositorio del backend: API REST/WebSocket, infraestructura Docker, monitorización.
  serverRepoUrl: 'https://github.com/yagomilenio/synergia-server',
  // Repositorio del cliente CLI y del worker que ejecuta las tareas en cada nodo.
  clientRepoUrl: 'https://github.com/yagomilenio/synergia-client',
  // Perfil de GitHub del autor.
  authorGithub: 'https://github.com/yagomilenio',
  author: 'Yago Manuel Sánchez Moscoso',
  license: 'GPL-3.0',

  // Documentación técnica completa, servida vía Astro + Starlight.
  docs: {
    arquitectura: '/docs/arquitectura',
    flujoDeTareas: '/docs/flujo-de-tareas',
    seguridad: '/docs/seguridad',
    modeloDeDatos: '/docs/modelo-de-datos',
    guiaDeDespliegue: '/docs/despliegue',
    configReference: '/docs/config-toml',
    cliReference: '/docs/cli',
    apiReference: '/docs/api-rest',
    wsReference: '/docs/api-websocket',
    economicModel: '/docs/modelo-economico',
    primerosPasos: '/docs/primeros-pasos',
  },

  // Tareas de ejemplo publicadas como repos GitHub independientes (ver TaskShowcase).
  exampleTasksRepoOwner: 'yagomilenio',
}
