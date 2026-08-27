---
title: Centro de Documentación Técnica de Synergia
description: Documentación oficial completa para desarrolladores, publicadores de tareas y operadores de nodos.
hero:
  tagline: Explora el funcionamiento interno, esquemas relacionales, referencias de comandos y guías de seguridad de Synergia.
  actions:
    - text: Introducción y Visión General
      link: /docs/introduccion/
      icon: right-arrow
      variant: primary
    - text: Guía de Despliegue Rápido
      link: /docs/primeros-pasos/
      icon: rocket
---

Bienvenido al centro oficial de documentación técnica de **Synergia**. Este espacio compila todos los detalles de diseño, implementaciones físicas, referencias de comandos y fórmulas de negocio que componen la red.

---

## Estructura de la Documentación

### 1. Guías de Inicio y Operación
* **[Introducción y Roles](/docs/introduccion/):** Aprende qué es Synergia, cuáles son sus objetivos y cómo se organizan sus repositorios.
* **[Primeros Pasos](/docs/primeros-pasos/):** Levanta el servidor con Docker Compose y conecta tu primer worker en menos de 5 minutos.
* **[Guía de Despliegue y Monitorización](/docs/metricas/):** Configuración del entorno de producción y visualización con Grafana.

### 2. Arquitectura de Sistemas y Seguridad
* **[Arquitectura General](/docs/arquitectura/):** Detalle operativo de las APIs REST/WebSocket, RabbitMQ, base de datos Oracle y túneles.
* **[Seguridad y Autenticación](/docs/seguridad/):** Criptografía Argon2, tokens JWT, email verifications y flujos OAuth2.0.
* **[Aislamiento del Worker (Sandboxing)](/docs/worker-aislamiento/):** Reducción de privilegios, capacidades Linux y cortafuegos de red con `iptables`.

### 3. Modelo Económico y Consenso
* **[Modelo Económico e Incentivos](/docs/modelo-economico/):** Fórmulas exactas de coste (CPU, RAM, GPU), penalización por reputación y control de deuda (algoritmo incremental de Welford).
* **[Modelo de Datos y Ledger](/docs/modelo-de-datos/):** Esquema relacional completo de la base de datos Oracle y transacciones inmutables mediante Blockchain Tables.

### 4. Referencias Técnicas para Desarrolladores
* **[Estructura del config.toml](/docs/config-toml/):** Descripción de los 6 tipos reales de particionado de entradas.
* **[Contrato del Makefile](/docs/contrato-makefile/):** Cómo empaquetar código agnóstico al lenguaje (targets `setup`, `run`, `clean`).
* **[Referencia del CLI](/docs/cli/):** Listado y flags de los 23 comandos de la utilidad de terminal `synergia`.
* **[API REST (25 endpoints)](/docs/api-rest/):** Especificación de rutas HTTP, métodos, cabeceras y payloads.
* **[Protocolo WebSocket](/docs/api-websocket/):** Mensajes en tiempo real, backpressure y reconciliación automática ante caídas.

---

## Repositorios del Proyecto

* **[synergia-server](https://github.com/yagomilenio/synergia-server):** Repositorio de la API, WebSocket, Oracle y despliegue Docker.
* **[synergia-client](https://github.com/yagomilenio/synergia-client):** Repositorio del CLI, scheduler y demonio del worker.
