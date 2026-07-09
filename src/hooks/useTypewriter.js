import { useEffect, useState } from 'react'

/**
 * Efecto máquina de escribir. Escribe `text` carácter a carácter
 * empezando tras `startDelay` ms, a razón de `speed` ms por carácter.
 */
export function useTypewriter(text, { speed = 32, startDelay = 300 } = {}) {
  const [output, setOutput] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOutput(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { output, done }
}
