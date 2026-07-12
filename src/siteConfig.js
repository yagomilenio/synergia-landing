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

  // Documentación técnica completa, servida como página estática independiente
  // (docs.html), fuera del árbol de rutas de la SPA principal.
  docs: {
    arquitectura: '/docs.html#arquitectura',
    flujoDeTareas: '/docs.html#flujo-de-tareas',
    seguridad: '/docs.html#seguridad',
    modeloDeDatos: '/docs.html#modelo-de-datos',
    guiaDeDespliegue: '/docs.html#despliegue',
    configReference: '/docs.html#config-toml',
    cliReference: '/docs.html#cli',
    apiReference: '/docs.html#api-rest',
    wsReference: '/docs.html#api-websocket',
    economicModel: '/docs.html#modelo-economico',
  },

  // Tareas de ejemplo publicadas como repos GitHub independientes (ver TaskShowcase).
  exampleTasksRepoOwner: 'yagomilenio',
}
