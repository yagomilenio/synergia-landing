---
title: Referencia de la API REST
description: Especificación completa de los 25 endpoints HTTP de la API REST de Synergia, métodos, requisitos de autenticación y flujos.
---

La API REST de Synergia orquesta todas las operaciones de negocio del ecosistema. Está implementada en **FastAPI** bajo el servidor ASGI **Uvicorn** y expone por defecto sus servicios en el puerto **`8000`**.

---

## Directivas Generales de Comunicación

* **Formato de datos:** Todas las peticiones y respuestas emplean codificación estándar `application/json`, excepto el endpoint de subida de resultados que utiliza `multipart/form-data`.
* **Mecanismo de Autenticación:** Se utiliza una cabecera personalizada denominada `token` conteniendo el token de sesión JSON Web Token (JWT) firmado por el servidor:
  `token: <JWT_VALUE>`
  *No se utiliza la cabecera estándar `Authorization: Bearer <JWT>`.*

---

## 1. Endpoints de Cuentas y Autenticación

| Método | Ruta HTTP | Requiere Auth | Descripción / Comportamiento |
| :--- | :--- | :--- | :--- |
| **`POST`** | `/account` | No | Crea una cuenta nueva. Hashea la contraseña con **Argon2id**, acredita el balance con `INITIAL_CREDITS` de bienvenida, genera un token JWT temporal y envía un correo electrónico de confirmación firmado vía SMTP. |
| **`GET`** | `/account/{username}` | No | Obtiene el perfil público del usuario: reputación ponderada, balance actual de créditos e historial de transferencias criptográficas. |
| **`GET`** | `/verify-email` | Token de verificación | Valida el JWT enviado en la URL (`?token=`) con propósito `email_verification` y marca la cuenta local como verificada. |
| **`POST`** | `/token` | No | Inicio de sesión local por credenciales. Recibe `username` o `email` más la contraseña en el cuerpo JSON, valida contra Argon2 y devuelve el JWT de sesión de 24 horas. |
| **`GET`** | `/auth/google` | No | Genera y devuelve la URL oficial del flujo OAuth2 contra Google, inyectando un parámetro de seguridad aleatorio `state` anti-CSRF guardado en una caché temporal TTL de 5 minutos. |
| **`GET`** | `/auth/google/callback` | No | Callback interceptado por el servidor. Intercambia el código `code` por el token de Google, recupera el correo electrónico del usuario, crea la cuenta de forma automática si es un correo nuevo y expide un JWT de Synergia. |
| **`GET`** | `/auth/github` | No | Equivalente a `/auth/google` para realizar el inicio de sesión OAuth 2.0 contra GitHub. |
| **`GET`** | `/auth/github/callback` | No | Callback de GitHub. Resuelve el token de acceso; si el correo electrónico de la cuenta de GitHub es privado, realiza una llamada cifrada secundaria al endpoint de seguridad `/user/emails` de la API de GitHub para validarlo. |

---

## 2. Endpoints de Gestión de Tareas (Publisher / General)

| Método | Ruta HTTP | Requiere Auth | Descripción / Comportamiento |
| :--- | :--- | :--- | :--- |
| **`POST`** | `/task` | **JWT** | Publica una tarea nueva. Descuenta el coste fijo de publicación `TASK_COST` de la cuenta del publicador, parsea el `config.toml` del repositorio para crear los chunks en RabbitMQ e inicializa los parámetros relacionales. |
| **`GET`** | `/task` | Opcional | Lista todas las tareas de la red. Si se proporciona el token de sesión JWT, admite el filtro `?subscribed=true` para retornar únicamente las tareas a las que tu worker se ha suscrito. |
| **`GET`** | `/task/{id}` | No | Muestra el detalle público, metadatos y snapshot de hash esperado para una tarea específica de la red. |
| **`PATCH`** | `/task/{id}` | **JWT (Publisher)** | Sincroniza y actualiza la firma del snapshot hash de integridad (`repo_snapshot_hash`) y la referencia del commit del repositorio en el servidor tras realizar un cambio de código legítimo. |
| **`PATCH`** | `/task/{id}/status` | **JWT (Publisher)** | Altera el estado del ciclo operativo de la tarea (`ACTIVE`, `PAUSED`, `CANCELLED`). La transición a `ACTIVE` valida que el publicador tiene créditos suficientes. La cancelación elimina de forma inmediata la cola RabbitMQ. |
| **`POST`** | `/task/{id}/input` | **JWT (Publisher)** | Inyecta nuevos ítems en caliente a una tarea dinámica activa de tipo `dynamic`. El payload se inyecta directamente como mensajes de RabbitMQ. |
| **`DELETE`** | `/task/{id}/subscription` | **JWT** | Desasocia permanentemente la suscripción de un usuario worker respecto a la tarea. |
| **`GET`** | `/task/{id}/progress` | No | Retorna el número de ítems totales procesados y verificados con éxito versus los pendientes en la cola. |
| **`GET`** | `/task/{id}/output` | No | Obtiene los resultados de procesamiento. Si se pasa `?download=true`, empaqueta dinámicamente los ficheros de salida en un ZIP de streaming. El parámetro `?canonical_only=true` descarta ficheros que no ganaron el consenso. |

---

## 3. Endpoints de Procesamiento y Ejecuciones (Worker)

| Método | Ruta HTTP | Requiere Auth | Descripción / Comportamiento |
| :--- | :--- | :--- | :--- |
| **`POST`** | `/task/{id}/process` | **JWT** | El worker declara el inicio de procesamiento de un rango de ítems (chunk). Crea un registro en la tabla `process` y `execution` con estado `PENDING`. Valida que el rango no se solape con procesos activos y que el snapshot local del worker coincida con el de la tarea. |
| **`GET`** | `/task/{id}/process` | No | Lista los procesos creados para una tarea, o localiza el proceso específico que abarca un índice de entrada concreto (`?index=`). |
| **`GET`** | `/task/{id}/process/{pid}` | No | Obtiene el metadato extendido de un proceso, su rango de límites y el ID de su ejecución canónica oficial. |
| **`GET`** | `/task/{id}/process/{pid}/executions` | No | Lista todos los intentos de ejecución individuales realizados por diferentes workers sobre el proceso indicado. |
| **`POST`** | `/task/{id}/process/{pid}/execution` | **JWT** | Registra el intento de un worker validador para realizar una verificación cruzada sobre un proceso previamente procesado por otro nodo. |
| **`POST`** | `/task/{id}/process/{pid}/execution/{eid}/result` | **JWT** | **Subida de resultados (`multipart/form-data`):** Sube el paquete binario comprimido de salida y adjunta las métricas físicas recolectadas (ciclos de CPU, RAM media, VRAM media y TDP). Dispara el algoritmo de Welford, calcula los créditos devueltos y actualiza el consenso mayoritario. |
| **`GET`** | `/task/{id}/confirm` | **JWT** | El worker pregunta qué proceso de la tarea requiere ser verificado con mayor urgencia por su nodo. El servidor responde con el ID basándose en perfiles de sospecha operativa. |

---

## 4. Endpoints de Observabilidad

| Método | Ruta HTTP | Requiere Auth | Descripción / Comportamiento |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/metrics` | No | Expone las métricas operativas del servidor REST en formato compatible con Prometheus (puertos de trabajadores activos, volumen físico de subidas, créditos pagados, etc.). |
