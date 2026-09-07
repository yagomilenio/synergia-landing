/**
 * Synergia Stratum-to-WebSocket Bridge Proxy
 * 
 * Permite a las aplicaciones cliente basadas en navegadores web (JS/WebAssembly)
 * conectarse de forma segura sobre WebSockets a las pools de minería de Monero
 * con puertos de baja dificultad (ej. MoneroOcean, WebMinePool, etc.) ideales para navegadores.
 * 
 * Evita al 100% el bloqueo de AdBlockers y Brave Shields al correr en tu propio origen.
 * 
 * Uso:
 *   node server-bridge.js
 */

const WebSocket = require('ws');
const net = require('net');

const PORT = process.env.PORT || 8080;

// MoneroOcean puerto de baja dificultad de inicio (ideal para hilos de navegador)
const POOL_HOST = 'gulf.moneroocean.stream';
const POOL_PORT = 10001; 

const wss = new WebSocket.Server({ port: PORT });

console.log(`[Synergia Bridge] Iniciando WebSocket -> Stratum Proxy en el puerto ${PORT}...`);

wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`[Synergia Bridge] Nueva conexión entrante desde el navegador: ${clientIp}`);

  // Conexión TCP directa al puerto de baja dificultad de la pool
  const stratumSocket = net.connect(POOL_PORT, POOL_HOST, () => {
    console.log(`[Synergia Bridge] Conexión TCP real establecida con la pool ${POOL_HOST}:${POOL_PORT}`);
  });

  // Escuchar mensajes del navegador (WebSockets) y enviarlos a la pool (Stratum TCP)
  ws.on('message', (message) => {
    try {
      const payloadString = message.toString();
      console.log(`[Navegador -> Pool]: ${payloadString.trim()}`);
      stratumSocket.write(payloadString + '\n');
    } catch (err) {
      console.error('[Synergia Bridge] Error al escribir en la pool:', err);
    }
  });

  // Escuchar mensajes de la pool y enviarlos al navegador por WebSocket
  stratumSocket.on('data', (data) => {
    try {
      const dataString = data.toString();
      console.log(`[Pool -> Navegador]: ${dataString.trim()}`);
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(dataString);
      }
    } catch (err) {
      console.error('[Synergia Bridge] Error al enviar al WebSocket:', err);
    }
  });

  ws.on('close', () => {
    console.log(`[Synergia Bridge] Conexión cerrada por el navegador: ${clientIp}`);
    stratumSocket.end();
  });

  stratumSocket.on('close', () => {
    console.log('[Synergia Bridge] Conexión cerrada por la pool.');
    ws.close();
  });

  stratumSocket.on('error', (err) => {
    console.error('[Synergia Bridge] Error de conexión con la pool:', err);
    ws.close();
  });

  ws.on('error', (err) => {
    console.error('[Synergia Bridge] Error de WebSocket en navegador:', err);
    stratumSocket.end();
  });
});

console.log(`[Synergia Bridge] Puente activo en ws://localhost:${PORT}`);
console.log(`[Synergia Bridge] Redirigiendo tráfico a ${POOL_HOST}:${POOL_PORT} (Dificultad ultra-baja para navegador)`);
