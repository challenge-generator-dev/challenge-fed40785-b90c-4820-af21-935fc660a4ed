# Consumo y visualización de eventos en tiempo real

El sistema debe publicar y consumir eventos en un topic de Kafka y mostrarlos en tiempo real en la interfaz de usuario. Los eventos representan el estado de las órdenes en el sistema de una empresa fintech. El objetivo es garantizar que los usuarios vean el estado actualizado de las órdenes sin demora.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Consumo de eventos en tiempo real con Kafka |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del servidor para publicar y consumir eventos

**Objetivo:** Configurar el servidor para que pueda publicar y consumir eventos de Kafka.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el servidor para conectarse a un cluster de Kafka.
- Crear un topic en Kafka para los eventos de las órdenes.
- Implementar la lógica para publicar eventos en el topic de Kafka.

**Entregable:** Servidor configurado y capaz de publicar eventos en Kafka.

<details>
<summary>Pistas de conocimiento</summary>

- Configuración de Kafka y creación de topics.
- Uso de la API de Kafka para producir y consumir eventos.

</details>

### Fase 2: Consumo de eventos y actualización de la interfaz

**Objetivo:** Consumir eventos de Kafka y actualizar la interfaz de usuario en tiempo real.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar la lógica para consumir eventos del topic de Kafka.
- Actualizar la interfaz de usuario con los datos recibidos de los eventos.
- Asegurar que la actualización de la interfaz sea en tiempo real.

**Entregable:** Interfaz de usuario que muestra el estado de las órdenes en tiempo real.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de WebSockets o polling para actualizar la interfaz en tiempo real.
- Manejo de eventos en el frontend.

</details>

### Fase 3: Optimización y manejo de errores

**Objetivo:** Optimizar el consumo de eventos y manejar posibles errores.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Optimizar el consumo de eventos para minimizar la latencia.
- Implementar manejo de errores para garantizar la robustez del sistema.
- Testear el sistema para asegurar que funcione correctamente en diferentes escenarios.

**Entregable:** Sistema optimizado y robusto para el consumo y visualización de eventos en tiempo real.

<details>
<summary>Pistas de conocimiento</summary>

- Técnicas de optimización para el consumo de eventos.
- Estrategias de manejo de errores en sistemas de eventos en tiempo real.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es Kafka y cómo se utiliza en este sistema?
- **paraQueSirve**: ¿Para qué sirve publicar y consumir eventos en Kafka en este contexto?
- **comoSeUsa**: ¿Cómo se configura el servidor para publicar y consumir eventos en Kafka?
- **erroresComunes**: ¿Qué errores comunes pueden ocurrir al consumir eventos de Kafka y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización del consumo de eventos y el manejo de errores?

## Criterios de Evaluacion

- Configuración del servidor para publicar y consumir eventos en Kafka.
- Consumo de eventos y actualización de la interfaz de usuario en tiempo real.
- Optimización del consumo de eventos y manejo de errores.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | Apache Kafka |
| `client` | `client/` | chapter, support | client | Angular | Angular |
| `infra-local` | (raiz) | support | infra | Compose local | Apache Kafka |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
3. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `GET /orders/events`
- `client` expone http (api: http://localhost:3000):
  - `GET /orders/events`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
