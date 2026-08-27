---
title: Modelo Económico y Reputación
description: Especificación formal del sistema monetario de Synergia, fórmulas de coste, liquidación por consenso y reputación ponderada.
---

Synergia incorpora una economía cerrada de intercambio directo de recursos de hardware basada en un token virtual denominado **crédito**. El sistema no se apoya en una blockchain de propósito general lenta y costosa; en su lugar, implementa un **ledger relacional criptográficamente enlazado** (tablas blockchain) gestionado por el motor de base de datos Oracle Database, garantizando atomicidad transaccional (ACID) e inmutabilidad absoluta.

---

## 1. Fórmulas de Cálculo de Coste de Ejecución

Cuando un worker procesa y sube con éxito un bloque de trabajo, el servidor calcula el coste computacional real acumulado basándose en las telemetrías de hardware enviadas por el nodo.

El coste total en créditos de una ejecución se modela como la suma de las contribuciones de CPU, RAM y, si aplica, GPU:

$$\text{Coste Total} = \text{Coste}_{\text{CPU}} + \text{Coste}_{\text{RAM}} + \text{Coste}_{\text{GPU}}$$

### Constantes de Tarificación del Sistema
Estas constantes relacionan el consumo físico de hardware con la economía de créditos interna de la plataforma, modeladas en `api.py` del servidor:

* **`CPU_COST_PER_CYCLE = 1e-9`:** Tarifa fija de 1 crédito por cada $1.000.000.000$ ($10^9$) de ciclos de CPU ejecutados (obtenidos de `perf stat`).
* **`RAM_COST_PER_GB_SEC = 0.001 * (887 / 1.985)`:** Tarifa de memoria RAM, ponderada por la relación de coste en la nube ($0,44685$ créditos por GB-segundo).
* **`GPU_COST_PER_WATT_SEC = 0.0001 * (887 / 4.3)`:** Tarifa de vídeo GPU ($0,02062$ créditos por vatio-segundo consumido).

### Ecuación de Costes Detallada
Para un proceso que duró $t$ segundos:

* **Cálculo de CPU:**
  $$\text{Coste}_{\text{CPU}} = \text{ciclos}_{\text{CPU}} \times 10^{-9}$$
* **Cálculo de RAM:**
  $$\text{RAM}_{\text{GB}} = \frac{\text{RAM}_{\text{media (bytes)}}}{1024^3}$$
  $$\text{Coste}_{\text{RAM}} = \text{RAM}_{\text{GB}} \times t \times \text{RAM\_COST\_PER\_GB\_SEC}$$
* **Cálculo de GPU:**
  $$\text{VRAM}_{\text{GB}} = \frac{\text{VRAM}_{\text{media (MB)}}}{1024}$$
  $$\text{Coste}_{\text{GPU}} = \text{VRAM}_{\text{GB}} \times \text{TDP}_{\text{w}} \times t \times \text{GPU\_COST\_PER\_WATT\_SEC}$$

---

## 2. Liquidación de Pagos

El servidor distribuye los créditos según las políticas de verificación configuradas en `config.toml`:

### 2.1 Tareas No Deterministas
No admiten verificación cruzada (p. ej. renderizados estocásticos o simulaciones físicas con semilla aleatoria variable).
* El primer worker que sube un resultado con estado `SUCCESS` cobra el **100% del coste total calculado** de forma directa e inmediata.
* Los créditos se transfieren directamente desde la cuenta del **Publisher** a la cuenta del **Worker**.

### 2.2 Tareas Deterministas (Verificación Cruzada)
Exigen coincidencia binaria de resultados para evitar que nodos fraudulentos falsifiquen cómputo.

El servidor evalúa el **resultado canónico**: el identificador del fichero de resultado (`result_file_id`) que cuenta con la mayoría de votos (ejecuciones correctas con hash idéntico). Ante empates, prevalece la ejecución más antigua.

Al subir un resultado:
1. **Divergencia del Consenso:** Si el worker envía un resultado que no coincide con el canónico actual, **no recibe créditos** por el trabajo y su reputación disminuye drásticamente.
2. **Consenso Consistente:** Si el worker coincide con el canónico y no es el creador original del mismo, actúa como validador. Recibe una **recompensa de verificación** pagada desde la cuenta del sistema `SYSTEM_FEES` (financiada por las tasas de publicación).
3. **Cambio de Canónico:** Si el nuevo resultado de verificación altera el consenso mayoritario (p. ej. se demuestra que el primer worker era fraudulento):
   * Se **revierte la transferencia de créditos** realizada al worker fraudulento (pasa a deuda contable).
   * Se realiza la transferencia completa al nuevo worker canónico legítimo desde el balance del Publisher.
   * Se reparte un bono de incentivo entre los validadores honestos que forzaron el cambio (financiado por `SYSTEM_FEES`).

---

## 3. Algoritmo de Reputación Ponderada

La reputación es el indicador de confiabilidad de cada cuenta en la plataforma. Mide la proporción de ejecuciones honestas en las que el nodo ha participado.

### Fórmula Matemática
Para evitar fraudes sencillos (como ejecutar miles de tareas baratas correctas para subir reputación y luego meter un fraude en una tarea de alto coste), la reputación de un usuario $u$ se calcula como un **porcentaje ponderado por el importe (créditos) de los procesos**:

$$\text{Reputación}_u = \frac{\sum_{e \in E_u} w(e)}{\sum_{e \in E_u} \text{amount}(e)} \times 100$$

Donde:
* $E_u$ es el conjunto de ejecuciones del usuario $u$ en procesos que cuentan con un resultado canónico verificado y donde el canónico actual **no pertenece** al propio usuario $u$.
* $\text{amount}(e)$ es el coste en créditos liquidado al canónico en dicho proceso.
* $w(e)$ es el peso ponderado de la ejecución, definido como:
  $$w(e) = \begin{cases} \text{amount}(e) & \text{si } e.\text{result} = \text{canon}(e) \\ 0 & \text{en caso contrario} \end{cases}$$

### Propiedades de Seguridad de la Reputación
* **Ponderación por Coste:** Los fraudes cometidos en tareas pesadas (mucha CPU/GPU) destruyen la reputación de forma inmediata, invalidando el nodo.
* **Control de Publicación:** El servidor impone un umbral mínimo de reputación (p. ej. 80%). Si la reputación de un usuario cae por debajo, **se le revoca temporalmente el derecho a publicar nuevas tareas**, obligándole a recuperar su reputación aportando cómputo honesto como worker.

---

## 4. Control de Deuda y Auto-Pausa (Welford)

Synergia admite deudas controladas en las cuentas de los publicadores para no colgar ejecuciones masivas a mitad de cálculo. No obstante, para proteger a los workers de impagos permanentes, el servidor implementa un filtro de detención automática.

Tras cada proceso $i$ finalizado en una tarea, el servidor actualiza la **media** ($\bar{x}$) y la **varianza** (mediante la suma de cuadrados $SS$) del coste por ítem de forma incremental en tiempo constante $O(1)$ usando el algoritmo de **Welford**:

$$SS_i = SS_{i-1} + (x_i - \bar{x}_{i-1})(x_i - \bar{x}_i)$$
$$\bar{x}_i = \bar{x}_{i-1} + \frac{x_i - \bar{x}_{i-1}}{i}$$
$$\sigma_i = \sqrt{\frac{SS_i}{i}}$$

El coste estimado del siguiente bloque de $k$ ítems a servir es:
$$\text{Coste Estimado} = (\bar{x}_i + \sigma_i) \times k$$

Si el saldo libre del Publisher cae por debajo de este umbral de seguridad, **todas sus tareas se pausan automáticamente** y las colas de RabbitMQ se depuran, impidiendo que los workers sigan procesando trabajo que el publicador no podrá cubrir financieramente.
