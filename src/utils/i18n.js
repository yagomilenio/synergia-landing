import { useState, useEffect } from 'react';

let currentLang = 'es';

if (typeof window !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang === 'en' || urlLang === 'es') {
    currentLang = urlLang;
  } else {
    const savedLang = localStorage.getItem('synergia-lang');
    if (savedLang === 'en' || savedLang === 'es') {
      currentLang = savedLang;
    } else {
      const browserLang = navigator.language || '';
      currentLang = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
    }
  }
}

const listeners = new Set();

export const getLanguage = () => currentLang;

export const setLanguage = (lang) => {
  if (lang !== 'en' && lang !== 'es') return;
  currentLang = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('synergia-lang', lang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
  }
  listeners.forEach((cb) => cb(lang));
};

export const useLanguage = () => {
  const [lang, setLangState] = useState(currentLang);

  useEffect(() => {
    listeners.add(setLangState);
    return () => {
      listeners.delete(setLangState);
    };
  }, []);

  return [lang, setLanguage];
};

export const TRANSLATIONS = {
  es: {
    nav: {
      why: 'Por qué Synergia',
      how: 'Cómo funciona',
      economics: 'Economía',
      useCases: 'Casos de uso',
      security: 'Seguridad',
      comparison: 'Comparativa',
      docs: 'Documentación',
    },
    hero: {
      eyebrow: 'PLATAFORMA DE CÓMPUTO DISTRIBUIDO',
      desc: 'Publica tareas computacionalmente costosas como un repositorio de GitHub. Cualquier nodo de la red puede procesarlas de forma aislada y segura, y a cambio recibe créditos que luego canjea para ejecutar sus propias tareas. Sin alquilar un solo servidor en la nube.',
      btnServer: 'Ver servidor',
      btnClient: 'Ver cliente CLI',
      btnDocs: 'Documentación',
      stat1_val: '< 5 min',
      stat1_desc: 'de instalación a tu primer bloque procesado',
      stat2_val: '100%',
      stat2_desc: 'aislamiento, cero acceso al host anfitrión',
      stat3_val: 'OpenSource',
      stat3_desc: 'nadie se lucra, eliges tú a quién ayudar',
      terminal_title: 'terminal',
      terminal_waiting: 'esperando siguiente bloque',
      frases: [
        'Convierte hardware inactivo en potencia de cómputo intercambiable.',
        'Sin suscripciones mensuales ni alquileres costosos en la nube.',
        'Publica tareas pesadas simplemente subiendo un Makefile a GitHub.',
        'Tus procesos se ejecutan de forma 100% aislada mediante sandboxing.',
        'Gana créditos prestando tu CPU o GPU cuando no las utilices.',
        'Canjea tus créditos acumulados para entrenar modelos de IA o renderizar.',
        'Consenso garantizado: todos los resultados se verifican por duplicado.',
        'Rentabiliza tu propio hardware transformando capacidad de cómputo en créditos de cálculo.',
        'Una red distribuida de alto rendimiento, libre de especulación.',
        'Sin wallets ni blockchain: gestionamos una economía limpia y justa.',
        'Monitorea tus nodos en tiempo real con Prometheus y Grafana.',
        'Aislamiento total con namespaces de Linux, cgroups y restricciones de red.',
        'Verificación cruzada de hashes SHA-256 para prevenir fraudes.',
        'Conecta tu cliente CLI en segundos y empieza a procesar tareas.',
        'Divide tareas masivas en bloques y procésalas en paralelo.',
        'Ejecuta LLMs de código abierto localmente con total privacidad.',
        'Tu hardware doméstico ahora forma parte de un superordenador global.',
        'Garantía de integridad: auditamos cada repositorio antes de ejecutar.',
        'Optimiza el hardware que ya posees y elimina costes en la nube.',
        'Synergia: la alternativa abierta a los monopolios del cloud computing.'
      ],
      logs: [
        { type: 'info', text: 'Obteniendo datos de la tarea...' },
        { type: 'info', text: 'Iniciando entorno aislado...' },
        {
          type: 'container',
          title: 'contenedor iniciado',
          data: [
            { label: 'nombre', value: 'synergia-task-1' },
            { label: 'cpu', value: '4 threads' },
            { label: 'ram', value: '2048 MB' },
            { label: 'gpu', value: '—' },
          ]
        },
        { type: 'info', text: 'Clonando repositorio...' },
        {
          type: 'commit',
          commit: 'a3c8e1a',
          message: 'feat: init Monte Carlo calculation'
        },
        { type: 'info', text: 'Instalando dependencias y actualizando sistema...' },
        { type: 'info', text: 'Aplicando políticas de seguridad...' },
        { type: 'info', text: 'Limpiando archivos innecesarios...' },
        { type: 'success', text: 'Conectado a tarea 1' },
        { type: 'run', text: 'make run START=0 END=4' },
      ]
    },
    problem: {
      eyebrow: 'EL PROBLEMA',
      title: 'Hay potencia de cómputo de sobra. Está apagada en salones y despachos.',
      kicker: 'El coste de las GPUs y la memoria de alto rendimiento no deja de subir, empujado por la demanda de la IA. Para muchos, la única vía de acceso a cómputo intensivo es asumir costosos alquileres por hora en grandes plataformas centralizadas. Mientras tanto, millones de procesadores y tarjetas gráficas en todo el mundo pasan la mayor parte del día en reposo.',
      facts: [
        {
          stat: '40–60%',
          desc: 'de la capacidad de procesamiento de un ordenador personal permanece infrautilizada durante su ciclo de vida.',
        },
        {
          stat: '~32M',
          desc: 'de procesadores y tarjetas gráficas dedicadas se distribuyeron solo en el cuarto trimestre de 2025.',
        },
        {
          stat: '5 GHz+',
          desc: 'de frecuencia y hasta 32 hilos de ejecución en las CPUs de consumo más recientes, la mayor parte del tiempo en reposo.',
        },
      ],
      quote_strong: '¿Tienes un procesador potente pero necesitas el músculo de una tarjeta gráfica de alta gama para entrenar un modelo de IA o renderizar en 3D?',
      quote_body: ' Con Synergia dejas de pagar facturas abusivas en la nube. Prestas tu CPU inactiva para validar tareas de otros, acumulas créditos de forma gratuita y los canjeas para lanzar tus cálculos masivos sobre las GPUs de la red. Tu hardware doméstico financia tu acceso a supercomputación especializada: sin intermediarios, sin comisiones y sin comprar hardware nuevo.',
    },
    how: {
      eyebrow: 'FUNCIONAMIENTO',
      title: 'Flujo de Trabajo de Cómputo Distribuido',
      kicker: 'Del repositorio a los resultados procesados en paralelo, de forma 100% aislada mediante contenedores y verificada mediante consenso.',
      steps: [
        {
          title: 'Definición del contrato',
          desc: 'El programador define un fichero de configuración estándar en la raíz de su repositorio. Synergia utiliza este fichero para compilar, instalar dependencias, ejecutar el procesamiento por rango y limpiar las salidas.',
        },
        {
          title: 'División del Trabajo',
          desc: 'El servidor de coordinación divide las tareas masivas en rangos numéricos continuos (chunks) y los introduce en una cola para su reparto equitativo.',
        },
        {
          title: 'Ejecución Aislada',
          desc: 'El nodo worker descarga el código y lanza un contenedor Docker cerrado. Se configuran restricciones estrictas de hardware (cgroups) y red sin tráfico externo.',
        },
        {
          title: 'Verificación por Consenso',
          desc: 'Varios nodos worker independientes procesan de forma repetida el mismo bloque. El servidor solo consolida el resultado si hay coincidencia canónica de hashes SHA-256.',
        },
        {
          title: 'Liquidación de Créditos',
          desc: 'Los créditos se asignan de forma directa a la cuenta del nodo, listos para ser consumidos en futuras tareas. Por otro lado la reputación cuantifica la fiabilidad del mismo.',
        }
      ],
      verified_badge: 'CONSENSO_CANÓNICO_VALIDADO',
      reputation: 'REPUTACIÓN DEL NODO',
      credits_settled: 'CRÉDITOS LIQUIDADOS'
    },
    economics: {
      eyebrow: 'ECONOMÍA CERRADA SIN DINERO REAL',
      title: 'Reciprocidad Computacional',
      kicker: 'Synergia prescinde por completo de divisas tradicionales, cuentas bancarias o criptomonedas especulativas. Todo se rige por un crédito virtual inconvertible, diseñado exclusivamente para medir y transferir el coste físico del cómputo útil aportado.',
      calc_section_title: 'SIMULADOR DE CRÉDITOS Y COSTES DE HARDWARE',
      calc_section_desc: 'Esta calculadora interactiva simula con total fidelidad matemática el coste en créditos de cualquier tarea procesada en la red Synergia. Las constantes y fórmulas matemáticas utilizadas aquí coinciden de forma exacta con la especificación y el código ejecutable del servidor central. Ajusta los parámetros de hardware real para simular los créditos que ganarías como Worker (nodo de cómputo) o que pagarías como Publisher (publicador de tareas).',
      pillars_section_title: '¿CÓMO SE SUSTENTA ESTA ECONOMÍA?',
      pillars_section_desc: 'El modelo económico de Synergia está diseñado bajo principios de reciprocidad pura y consistencia matemática absoluta para evitar abusos o especulación.',
      badge_cycle: 'EL CICLO DE RECIPROCIDAD',
      flow_steps: [
        {
          title: 'Aportas ciclos como Worker',
          desc: 'Tu nodo procesa bloques de tareas activas o la Tarea Génesis de bien común (Folding@Home), generando créditos y reputación sin coste monetario.'
        },
        {
          title: 'Acumulas Créditos de Cómputo',
          desc: 'Cada bloque verificado por consenso se liquida mediante una transferencia de créditos desde la cuenta del publicador (o desde MINT para la Tarea Génesis).'
        },
        {
          title: 'Publicas como Publisher gratis',
          desc: 'Canjeas tus créditos acumulados para subir tus propias tareas computacionales, distribuyéndolas en paralelo entre los workers de la red.'
        }
      ],
      badge_efficiency: 'SISTEMA DE INTERCAMBIO',
      traditional_cloud: 'CÓMPUTO TRADICIONAL (ALQUILER CLOUD)',
      traditional_list: [
        'Facturación en dinero fiduciario real mediante pagos recurrentes.',
        'Costes fijos continuos independientemente del uso efectivo.',
        'Fricciones de entrada, especulación de precios y dependencia de monopolios.'
      ],
      synergia_network: 'SISTEMA SYNERGIA (CRÉDITO CERRADO)',
      synergia_list: [
        'Intercambio directo: capacidad de cómputo útil por créditos de cálculo.',
        'Cero transacciones monetarias o comisiones de gas especulativo.',
        'Amortización absoluta de hardware inactivo convirtiéndolo en potencia futura.'
      ],
      pillar1_title: 'Cero Especulación Financiera',
      pillar1_desc: 'Los créditos son inconvertibles: no cotizan en mercados ni tienen valor monetario. No hay especulación, no hay burbujas, no hay wallets criptográficas. Un crédito equivale estrictamente a trabajo real (ciclos de CPU, RAM y TDP medidos).',
      pillar2_title: 'Soporte Génesis (Folding@Home)',
      pillar2_desc: 'El cold start se resuelve mediante ciencia colaborativa. Al simular el plegado molecular de proteínas de Stanford, la red genera créditos iniciales para que cualquiera pueda publicar sin una barrera económica previa.',
      pillar3_title: 'Reputación Ponderada por Importe',
      pillar3_desc: 'Para blindar la economía, la fiabilidad de cada nodo se calcula proporcionalmente al importe de créditos de sus tareas verificadas. Esto anula fraudes baratos donde atacantes intenten simular miles de ejecuciones sencillas.',
    },
    quickstart: {
      eyebrow: 'INICIO RÁPIDO',
      title: 'Empieza a Contribuir en 3 Pasos',
      kicker: 'No necesitas configuraciones tediosas ni infraestructuras complejas. Instala el cliente oficial, apunta de forma obligatoria al servidor de tu elección, autentícate y empieza a procesar tareas en segundos.',
      step1_title: 'Instala el Cliente CLI',
      step1_desc: 'Descarga e instala la herramienta interactiva del cliente en tu sistema de forma global directamente desde PyPI.',
      step2_title: 'Configura el Servidor',
      step2_desc: 'Al tratarse de una arquitectura federada y descentralizada, se deben configurar los endpoints de conexión correspondientes. Cada servidor orquesta su propio clúster de tareas, colas de mensajería y ledger de créditos independiente; según los servidores configurados, el nodo se integra en una red de cómputo de Synergia u otra, existiendo plena flexibilidad para unirse a redes públicas, privadas o desplegar infraestructura propia.',
      step2_link: 'Ver guía para desplegar tu propio servidor Synergia',
      step3_title: 'Autenticación y Ejecución',
      step3_desc: 'Tras iniciar sesión de forma segura a través del proveedor preferido (como GitHub, Google o credenciales locales), se puede comenzar a procesar tareas directamente con comandos de ejecución o mediante la activación del planificador automatizado (p. ej., utilizando synergia subscribe-task --task-id <id> o synergia start-scheduler).',
      step3_link: 'Ver todos los métodos de autenticación (Google, GitHub, email) y comandos CLI'
    },
    showcase: {
      eyebrow: 'DEMOSTRACIÓN DE TAREAS',
      title: 'Casos de Uso Operativos',
      kicker: 'Estos son cuatro de los repositorios reales utilizados durante el desarrollo de la plataforma, listos para ser ejecutados de forma distribuida en cualquier nodo de la red.',
      card_link: 'Ver repositorio en GitHub',
      items: [
        {
          name: 'Renderizado con Blender',
          desc: 'Renderizado distribuido de frames de la animación «Blender 4.1 Splash», dividiendo el rango de fotogramas entre los workers con aceleración por GPU/CPU.',
        },
        {
          name: 'Crackeo de Hashes',
          desc: 'Crackeo distribuido de hashes de contraseñas yescrypt mediante ataque de diccionario utilizando John the Ripper.',
        },
        {
          name: 'Inferencia de Lenguaje',
          desc: 'Procesamiento de prompts dinámicos recibidos como argumento en un modelo LLM local ejecutado mediante Ollama, emitiendo la respuesta por stdout.',
        },
        {
          name: 'Plegamiento de Proteínas',
          desc: 'Integración con el cliente oficial de Folding@Home para simulaciones biomédicas de plegado de proteínas.',
        }
      ]
    },
    security: {
      eyebrow: 'SEGURIDAD INTEGRAL',
      title: 'Aislamiento Estricto y Auditoría Automática',
      kicker: 'Ejecutar código ajeno en tu hardware requiere garantías totales. Synergia combina aislamiento a nivel de sistema operativo y red, con un proceso de consenso criptográfico robusto.',
      features: [
        {
          title: 'Sandboxing con Docker',
          desc: 'Cada proceso corre dentro de un contenedor Docker efímero y ligero, con namespaces de Linux, hilos limitados (cgroups) y sin privilegios de root.',
        },
        {
          title: 'Bloqueo de Red por Firewall',
          desc: 'Aislamiento de red mediante iptables. Se bloquean todas las conexiones entrantes y salientes para asegurar que la tarea no pueda exfiltrar datos ni realizar peticiones sospechosas.',
        },
        {
          title: 'Auditoría Estática del Repositorio',
          desc: 'Antes de que el nodo worker acepte y ejecute una tarea, el sistema analiza el repositorio para verificar que el Makefile y scripts no contengan llamadas maliciosas.',
        },
        {
          title: 'Verificación SHA-256 Cruzada',
          desc: 'Consenso: al menos dos nodos deben devolver el mismo hash SHA-256 de los ficheros de salida del procesamiento para dar por válido un bloque.',
        }
      ]
    },
    comparison: {
      eyebrow: 'COMPARATIVA DE PLATAFORMAS',
      title: 'Frente a BOINC, Folding@Home, SETI y Golem Network',
      kicker: 'La mayoría de plataformas de cómputo distribuido o bien recompensan solo de forma cosmética, o bien exigen la complejidad de una red descentralizada. Synergia se queda con lo mejor de cada extremo: incentivos reales, sin blockchain.',
      cols: ['Plataforma', 'Incentivos', 'Tareas arbitrarias', 'Aislamiento', 'Verificación', 'Participación abierta', 'Autoalojable', 'Orientación'],
      rows: [
        ['BOINC', 'Cosmético', 'Parcial', 'Parcial', 'Sí', 'No', 'Sí', 'Científica'],
        ['Folding@Home', 'Cosmético', 'No', 'Parcial', '—', 'No', 'No', 'Científica biomédica'],
        ['SETI', 'Cosmético', 'No', 'Parcial', 'Sí', 'No', 'No', 'Científica astronómica'],
        ['Golem Network', 'Sí', 'Sí', 'Sí', 'Sí', 'Sí', 'No', 'General'],
        ['Synergia', 'Sí', 'Sí', 'Sí', 'Sí', 'Sí', 'Sí', 'General'],
      ],
      note: 'Escala cualitativa: <strong>Sí</strong> cumple el criterio por completo · <strong>Parcial</strong> lo soporta con limitaciones relevantes · <strong>No</strong> no lo soporta · <strong>—</strong> información no disponible.',
      highlight_tag: '// TU PLATAFORMA'
    },
    docsSection: {
      eyebrow: 'DOCUMENTACIÓN Y USO',
      title: 'De cero a tu primer nodo en la red',
      kicker: 'El servidor y el cliente viven en repositorios separados, cada uno con su propio README, tests y documentación técnica. Aquí tienes el camino corto para levantar ambos.',
      cards: [
        { title: 'Primeros pasos', desc: 'Configura e instala el cliente CLI y levanta tu nodo para conectarte de inmediato a la red.' },
        { title: 'Arquitectura del sistema', desc: 'Conoce el ecosistema distribuido de APIs, colas RabbitMQ, bases de datos y la monitorización.' },
        { title: 'Seguridad y aislamiento', desc: 'El sandboxing de ejecución, contenedores sin privilegios, control de recursos y autenticación JWT.' },
        { title: 'Modelo de datos', desc: 'Esquema relacional y estructura de base de datos para transacciones, tareas y métricas de red.' },
        { title: 'Referencia del CLI', desc: 'Todos los comandos interactivos y flags para gestionar tus dispositivos y monitorizar tareas.' },
        { title: 'Modelo económico', desc: 'La fórmula de cálculo de costes de CPU/GPU y el reparto equitativo de créditos de cómputo.' },
      ],
      note_p1: 'Toda la documentación técnica de fondo: API, CLI, config.toml, modelo económico y modelo de datos, vive en una ',
      note_link: 'página independiente',
      note_p2: ', separada de esta landing y contrastada línea a línea contra el código fuente de ambos repositorios.'
    },
    footer: {
      cta_title: '¿Lo revisamos a fondo?',
      cta_desc: 'El servidor y el cliente CLI son proyectos independientes, cada uno con su propio repositorio, documentación técnica y suite de tests. Todo el código es abierto bajo licencia',
      cta_btn_server: 'Repositorio del servidor',
      cta_btn_client: 'Repositorio del cliente',
      cta_btn_docs: 'Documentación',
      brand_desc: 'Plataforma de cómputo distribuido con verificación de resultados e incentivos por créditos.',
      brand_license_sep: 'código abierto',
      brand_policy: 'Política de Seguridad',
      brand_terms: 'Términos y Condiciones',
      credits_author: 'Autor',
      credits_github: 'GitHub'
    }
  },
  en: {
    nav: {
      why: 'Why Synergia',
      how: 'How It Works',
      economics: 'Economics',
      useCases: 'Use Cases',
      security: 'Security',
      comparison: 'Comparison',
      docs: 'Documentation',
    },
    hero: {
      eyebrow: 'DISTRIBUTED COMPUTING PLATFORM',
      desc: 'Publish computationally expensive tasks as a GitHub repository. Any node in the network can process them in a safe, isolated sandbox, receiving credits in return to run their own tasks. Without renting a single cloud server.',
      btnServer: 'View Server',
      btnClient: 'View CLI Client',
      btnDocs: 'Documentation',
      stat1_val: '< 5 min',
      stat1_desc: 'from git clone to your first processed block',
      stat2_val: '100%',
      stat2_desc: 'isolation: zero host access, always containerized',
      stat3_val: 'Open Source',
      stat3_desc: 'nobody profits, you choose who to help',
      terminal_title: 'terminal',
      terminal_waiting: 'waiting for next block',
      frases: [
        'Turn idle hardware into tradeable computation power.',
        'No monthly subscriptions or expensive cloud rentals.',
        'Publish heavy tasks simply by uploading a Makefile to GitHub.',
        'Your processes run 100% isolated through strict sandboxing.',
        'Earn credits by lending your CPU or GPU when not in use.',
        'Redeem your accumulated credits to train AI models or render.',
        'Guaranteed consensus: all results are double-checked.',
        'Monetize your own hardware by converting compute capacity into credits.',
        'A high-performance distributed network, free of speculation.',
        'No wallets or blockchain: we run a clean, fair economy.',
        'Monitor your nodes in real time with Prometheus and Grafana.',
        'Complete isolation with Linux namespaces, cgroups, and firewall rules.',
        'Cross-validation of SHA-256 hashes to prevent fraud.',
        'Connect your CLI client in seconds and start processing tasks.',
        'Split massive tasks into chunks and process them in parallel.',
        'Run open-source LLMs locally with absolute privacy.',
        'Your home hardware is now part of a global supercomputer.',
        'Integrity guarantee: we audit every repository before execution.',
        'Optimize the hardware you already own and eliminate cloud costs.',
        'Synergia: the open alternative to cloud computing monopolies.'
      ],
      logs: [
        { type: 'info', text: 'Fetching task data...' },
        { type: 'info', text: 'Launching isolated sandbox...' },
        {
          type: 'container',
          title: 'container started',
          data: [
            { label: 'name', value: 'synergia-task-1' },
            { label: 'cpu', value: '4 threads' },
            { label: 'ram', value: '2048 MB' },
            { label: 'gpu', value: '—' },
          ]
        },
        { type: 'info', text: 'Cloning repository...' },
        {
          type: 'commit',
          commit: 'a3c8e1a',
          message: 'feat: init Monte Carlo calculation'
        },
        { type: 'info', text: 'Installing dependencies and updating system...' },
        { type: 'info', text: 'Applying security policies...' },
        { type: 'info', text: 'Cleaning unnecessary files...' },
        { type: 'success', text: 'Connected to task 1' },
        { type: 'run', text: 'make run START=0 END=4' },
      ]
    },
    problem: {
      eyebrow: 'THE PROBLEM',
      title: 'There is plenty of compute power. It sits powered off in homes and offices.',
      kicker: 'The cost of GPUs and high-performance memory keeps rising, driven by AI demand. For many, the only path to intensive computation is renting expensive hourly instances from large centralized platforms. Meanwhile, millions of processors and graphics cards worldwide remain idle most of the day.',
      facts: [
        {
          stat: '40–60%',
          desc: 'of a personal computer\'s processing capacity remains underutilized throughout its lifecycle.',
        },
        {
          stat: '~32M',
          desc: 'dedicated processors and graphics cards were distributed in Q4 2025 alone.',
        },
        {
          stat: '5 GHz+',
          desc: 'frequency and up to 32 execution threads in the latest consumer CPUs, staying idle most of the time.',
        },
      ],
      quote_strong: 'Do you have a powerful processor but need high-end graphics power to train an AI model or render in 3D?',
      quote_body: ' With Synergia, you stop paying extortionate cloud bills. You lend your idle CPU to validate tasks from others, accumulate credits for free, and redeem them to run your massive workloads across the network\'s GPUs. Your consumer hardware finances your access to specialized supercomputing: no middlemen, no fees, and no new hardware needed.',
    },
    how: {
      eyebrow: 'HOW IT WORKS',
      title: 'Distributed Compute Workflow',
      kicker: 'From repository to parallel-processed results, 100% isolated through containers and verified by mathematical consensus.',
      steps: [
        {
          title: 'Contract Definition (Makefile)',
          desc: 'The developer defines a standard Makefile at the root of their repository. Synergia uses this to build, install dependencies, run range processing, and clean outputs.',
        },
        {
          title: 'Work Splitting (Chunks)',
          desc: 'The coordinator server splits massive tasks into continuous numerical ranges (chunks) and queues them for fair distribution.',
        },
        {
          title: 'Isolated Execution (Worker)',
          desc: 'The worker node downloads the code and spins up an ephemeral Docker container. Hard resource limits (cgroups) and isolated network rules are applied.',
        },
        {
          title: 'Consensus Verification',
          desc: 'Multiple independent worker nodes process the exact same block. The server only commits results if SHA-256 output hashes match.',
        },
        {
          title: 'Credit Settlement',
          desc: 'Credits and operational reputation points are instantly credited to the node\'s account, ready to be spent on future tasks.',
        }
      ],
      verified_badge: 'CANONICAL_CONSENSUS_VALIDATED',
      reputation: 'NODE REPUTATION',
      credits_settled: 'CREDITS SETTLED'
    },
    economics: {
      eyebrow: 'ECONOMIC MODEL & RECIPROCITY',
      title: 'Fair Exchange of Computing Capacity',
      kicker: 'Compute does not come from thin air: it is sustained by real work. Synergia implements a circular economy where you lend cycles when your hardware is idle, and claim them back multiplied when you need massive parallel power.',
      calc_section_title: 'CREDIT SIMULATOR & HARDWARE COSTS',
      calc_section_desc: 'This interactive calculator simulates with mathematical precision the credit cost of any task processed in the Synergia network. The constants and formulas used here align perfectly with the backend specification and server code. Adjust real hardware parameters to simulate credits you would earn as a Worker (compute node) or spend as a Publisher (task publisher).',
      pillars_section_title: 'HOW DOES THIS ECONOMY WORK?',
      pillars_section_desc: 'The economic model of Synergia is designed under principles of pure reciprocity and absolute mathematical consistency to prevent speculation or exploitation.',
      badge_cycle: 'RECIPROCITY CYCLE',
      flow_steps: [
        {
          title: 'Process Tasks as a Worker',
          desc: 'Your node executes workload chunks or runs the collaborative science genesis task (Folding@Home) to earn credits without any monetary spending.'
        },
        {
          title: 'Earn Credits and Reputation',
          desc: 'Each block verified through mathematical consensus adds credits to your balance and boosts your reliability score on the immutable ledger.'
        },
        {
          title: 'Publish Your Tasks as a Publisher',
          desc: 'Redeem your accumulated credits to publish your own computational tasks and distribute them across multiple nodes in parallel.'
        }
      ],
      badge_efficiency: 'OPERATIONAL EFFICIENCY',
      traditional_cloud: 'TRADITIONAL CLOUD RENTAL',
      traditional_list: [
        'Recurring flat-rate monetary billing on credit cards.',
        'Continuous hourly charges regardless of actual hardware usage.',
        'Entry barriers and vendor lock-in to centralized providers.'
      ],
      synergia_network: 'SYNERGIA NETWORK (RECIPROCITY)',
      synergia_list: [
        'Settlements based on verified, real computational work.',
        'On-demand processing or utilizing idle hardware cycles.',
        'Direct amortization and profit from your existing hardware.'
      ],
      pillar1_title: 'Zero Financial Speculation',
      pillar1_desc: 'No volatile tokens, complex wallets, or market speculation. A Synergia credit represents strictly a measured amount of verified, useful computing work.',
      pillar2_title: 'Fraud-Proof Consensus',
      pillar2_desc: 'The network validates that multiple nodes output identical results before credits are settled. Nodes calculating consistently accumulate reputation.',
      pillar3_title: 'Hardware Amortization',
      pillar3_desc: 'Ideal for compute centers, universities, enterprises, or indie developers. Amortize hardware investments by maximizing its utilization rate.',
    },
    quickstart: {
      eyebrow: 'QUICK START',
      title: 'Start Contributing in 3 Steps',
      kicker: 'No tedious configurations or complex setups required. Install the official client, define your choice of server endpoint, authenticate, and start processing tasks.',
      step1_title: 'Install CLI Client',
      step1_desc: 'Download and install the interactive client tool globally on your system directly from PyPI.',
      step2_title: 'Configure the Server',
      step2_desc: 'As a decentralized protocol, you must define the connection endpoints. You have absolute freedom to connect to any server hosting your node.',
      step2_link: 'Read guide to deploy your own Synergia server',
      step3_title: 'Authenticate & Run',
      step3_desc: 'Log in securely and instantly using your provider (GitHub, Google, or local email credentials) and dive into processing Stanford\'s Folding@Home simulation.',
      step3_link: 'View all authentication methods (Google, GitHub, email) and CLI commands'
    },
    showcase: {
      eyebrow: 'TASK SHOWCASE',
      title: 'Real Tasks Running in Production',
      kicker: 'These four real-world repositories were used during platform development, fully prepared to be run on any node across the network.',
      card_link: 'View on GitHub',
      items: [
        {
          name: 'Blender 3D Render',
          desc: 'Distributed frame rendering of the "Blender 4.1 Splash" animation, splitting frame ranges across workers with GPU/CPU acceleration.',
        },
        {
          name: 'Hash Cracker',
          desc: 'Distributed cracking of yescrypt password hashes through dictionary attack using John the Ripper.',
        },
        {
          name: 'LLM Inference',
          desc: 'Dynamic processing of prompts received as arguments on a local LLM executed via Ollama, emitting the response through stdout.',
        },
        {
          name: 'Protein Folding',
          desc: 'Integration with the official Folding@Home client for biomedical protein folding simulations, resolving the cold-start deadlock (genesis task).',
        }
      ]
    },
    security: {
      eyebrow: 'COMPLETE SECURITY',
      title: 'Strict Sandboxing and Automatic Audits',
      kicker: 'Running external code on your hardware requires full confidence. Synergia combines operating system isolation, strict network firewalls, and cryptographic consensus.',
      features: [
        {
          title: 'Docker Sandboxing',
          desc: 'Each process runs in an ephemeral, lightweight Docker container, with restricted Linux namespaces, cgroups, and no root privileges.',
        },
        {
          title: 'Firewall Network Block',
          desc: 'Network isolation using iptables. All incoming and outgoing connections are blocked to ensure tasks cannot exfiltrate data.',
        },
        {
          title: 'Static Repo Audits',
          desc: 'Before any worker node executes a task, the system analyzes the repository to ensure Makefiles and scripts contain no malicious calls.',
        },
        {
          title: 'SHA-256 Cross-Verification',
          desc: 'Mathematical consensus: at least two independent nodes must return matching SHA-256 hashes of output files to validate a block.',
        }
      ]
    },
    comparison: {
      eyebrow: 'PLATFORM COMPARISON',
      title: 'Against BOINC, Folding@Home, SETI and Golem Network',
      kicker: 'Most distributed computing platforms either reward with cosmetic points or demand the complexity of a decentralized blockchain network. Synergia takes the best of both worlds: real incentives, without blockchain.',
      cols: ['Platform', 'Incentives', 'Arbitrary tasks', 'Isolation', 'Verification', 'Open participation', 'Self-hostable', 'Orientation'],
      rows: [
        ['BOINC', 'Cosmetic', 'Partial', 'Partial', 'Yes', 'No', 'Yes', 'Scientific'],
        ['Folding@Home', 'Cosmetic', 'No', 'Partial', '—', 'No', 'No', 'Biomedical research'],
        ['SETI', 'Cosmetic', 'No', 'Partial', 'Yes', 'No', 'No', 'Astronomical research'],
        ['Golem Network', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'No', 'General'],
        ['Synergia', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'General'],
      ],
      note: 'Qualitative scale: <strong>Yes</strong> meets criteria fully · <strong>Partial</strong> supported with limitations · <strong>No</strong> unsupported · <strong>—</strong> information unavailable.',
      highlight_tag: '// YOUR PLATFORM'
    },
    docsSection: {
      eyebrow: 'DOCUMENTATION & USAGE',
      title: 'From zero to your first network node',
      kicker: 'The server and CLI client live in separate repositories, each with its own README, test suite, and technical documentation. Here is the fast track to getting started.',
      cards: [
        { title: 'Quick Start', desc: 'Configure and install the CLI client and spin up your node to join the network immediately.' },
        { title: 'System Architecture', desc: 'Discover the distributed ecosystem of APIs, RabbitMQ queues, databases, and monitoring.' },
        { title: 'Security & Isolation', desc: 'Runtime sandboxing, unprivileged containers, resource limits, and JWT authentication.' },
        { title: 'Data Model', desc: 'Relational schema and database structure for transactions, tasks, and network metrics.' },
        { title: 'CLI Reference', desc: 'Comprehensive interactive commands and flags to manage devices and monitor tasks.' },
        { title: 'Economic Model', desc: 'The compute cost formula for CPU/GPU and the fair distribution of credits.' },
      ],
      note_p1: 'All comprehensive technical documentation: API, CLI, config.toml, economic model, and data schemas, lives on a ',
      note_link: 'dedicated documentation hub',
      note_p2: ', audited line by line against the source code of both repositories.'
    },
    footer: {
      cta_title: 'Shall we dive deeper?',
      cta_desc: 'The server and CLI client are independent projects, each with its own repository, technical documentation, and test suite. All code is open-source under licensing by',
      cta_btn_server: 'Server repository',
      cta_btn_client: 'Client repository',
      cta_btn_docs: 'Documentation',
      brand_desc: 'Distributed computing platform featuring outcome verification and credit-based incentives.',
      brand_license_sep: 'open source',
      brand_policy: 'Security Policy',
      brand_terms: 'Terms & Conditions',
      credits_author: 'Author',
      credits_github: 'GitHub'
    }
  }
};
