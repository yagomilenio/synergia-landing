// randomxMiner.worker.js
//
// Minado REAL de RandomX (algoritmo Monero) en un Web Worker, usando la
// implementación en WebAssembly de la librería open-source `randomx.js`.
//
// IMPORTANTE — limitación honesta, léela antes de tocar nada:
// RandomX está diseñado (a propósito) para ser lento y difícil de acelerar.
// Esta implementación en JS/WASM ronda decenas de H/s por pestaña, frente a
// los GH/s de la red de Monero. Es minado real (los hashes y el submit son
// auténticos), pero la probabilidad de que se acepte una share incluso en un
// puerto de dificultad mínima es extremadamente baja. No infles esta cifra
// artificialmente en la UI: si no hay shares, se muestran 0.

import { randomx_init_cache, randomx_create_vm } from 'randomx.js'

let vm = null
let cache = null
let currentSeedHash = null
let mining = false
let hashCount = 0
let lastReport = 0
let generation = 0 // se incrementa en cada 'start'/'newJob'/'stop' para invalidar bucles previos

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

// Compara el hash resultante contra el target de la pool (formato Stratum:
// target en little-endian hex, se cumple si hash (como entero, LE) <= target).
function hashMeetsTarget(hashBytes, targetHex) {
  const targetBytes = hexToBytes(targetHex.padEnd(64, '0').slice(0, 64))
  // Comparación big-endian invirtiendo ambos arrays (los valores llegan en LE)
  for (let i = hashBytes.length - 1; i >= 0; i--) {
    if (hashBytes[i] < targetBytes[i]) return true
    if (hashBytes[i] > targetBytes[i]) return false
  }
  return true
}

function ensureCache(seedHashHex) {
  if (currentSeedHash === seedHashHex && vm) return
  // La cache de RandomX depende de la seed_hash que envía la pool (cambia
  // aprox. cada 2048 bloques). Si cambia, hay que reconstruirla.
  cache = randomx_init_cache(seedHashHex)
  vm = randomx_create_vm(cache)
  currentSeedHash = seedHashHex
}

function mineJob(job, myGeneration) {
  ensureCache(job.seedHash)

  const blobBytes = hexToBytes(job.blob)
  let nonce = Math.floor(Math.random() * 0xffffffff)

  hashCount = 0
  lastReport = performance.now()

  while (mining && myGeneration === generation) {
    // Escribimos el nonce (4 bytes) en el offset estándar del blob (byte 39
    // en el formato de Monero). Ajusta `nonceOffset` si tu pool usa otro.
    const attempt = blobBytes.slice()
    const nonceOffset = job.nonceOffset ?? 39
    attempt[nonceOffset] = nonce & 0xff
    attempt[nonceOffset + 1] = (nonce >> 8) & 0xff
    attempt[nonceOffset + 2] = (nonce >> 16) & 0xff
    attempt[nonceOffset + 3] = (nonce >> 24) & 0xff

    const hash = vm.calculate_hash(attempt)
    hashCount++

    if (hashMeetsTarget(hash, job.target)) {
      postMessage({
        type: 'share',
        jobId: job.jobId,
        nonce: nonce.toString(16).padStart(8, '0'),
        result: bytesToHex(hash)
      })
    }

    nonce = (nonce + 1) >>> 0

    const now = performance.now()
    if (now - lastReport >= 1000) {
      postMessage({ type: 'hashrate', hps: Math.round((hashCount * 1000) / (now - lastReport)) })
      hashCount = 0
      lastReport = now
      // Cede el control brevemente para no congelar el worker del todo;
      // seguimos minando al volver del microtask.
      break
    }
  }

  if (mining && myGeneration === generation) setTimeout(() => mineJob(job, myGeneration), 0)
}

onmessage = (e) => {
  const { type, job } = e.data

  if (type === 'start') {
    mining = true
    generation++
    mineJob(job, generation)
  }

  if (type === 'newJob') {
    generation++ // invalida el bucle del job anterior
    mineJob(job, generation)
  }

  if (type === 'stop') {
    mining = false
    generation++
  }
}
