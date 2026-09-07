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

  // =========================================================================
  // CONFIGURACIÓN DE DONACIONES DE CÓMPUTO (CPU & GPU EN EL NAVEGADOR)
  // =========================================================================
  donation: {
    enabled: true,

    // 1. Monedero Monero (XMR) para donaciones de CPU / WASM
    // Reemplaza por tu dirección pública de Monero (empieza por 4 u 8)
    xmrWallet: '42jRR9GC2pyMoxwbhtRxMuDRQz3iFc32Z8MEpuD67NUQB2pNrSXSQR55QD1wHS9pEVfQ5w2KrzGUx4HDfXg2H5eiHBDLwSm',

    // 2. Monedero Ravencoin (RVN) o token para donaciones de GPU / Shaders
    // Reemplaza por tu dirección pública de Ravencoin (empieza por R)
    rvnWallet: 'RGfQmJ7HTuFLi9JD82uGaRTvx4v9QEivW9',

    // 3. Pool o Proxy Stratum WebSocket (Opcional para minería en red real):
    // Si tienes un proxy WebSocket propio (ej. wss://proxy.synergia.ai o wss://xmr.pool.com:443/ws)
    rvnStratumProxy: 'solo-rvn.2miners.com:7070',

    xmrStratumProxy: 'pool.hashvault.pro:443',
  }
}
