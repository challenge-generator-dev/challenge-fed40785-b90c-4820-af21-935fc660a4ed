# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/application/services/order-event.service.ts` — La fase "Configuración del servidor para publicar y consumir eventos" se implementa aqui: este archivo es el ejercicio.
- `api/src/infrastructure/messaging/kafka-order-event.adapter.ts` — La fase "Consumo de eventos y actualización de la interfaz" se implementa aqui: este archivo es el ejercicio.

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

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2

### Brecha de conocimiento
Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real, Publica y consume eventos de un topic Kafka y refleja los mensajes en la interfaz

### Misión / candidato
Mostrar en vivo el estado de las ordenes

### Reto
- Tema: Consumo de eventos en tiempo real con Kafka
- Seniority: advanced-l2
- Tipo: practical
- Título: Consumo y visualización de eventos en tiempo real
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del servidor para publicar y consumir eventos — objetivo: Configurar el servidor para que pueda publicar y consumir eventos de Kafka. — entregable (NO resolver): Servidor configurado y capaz de publicar eventos en Kafka.
- Fase 2: Consumo de eventos y actualización de la interfaz — objetivo: Consumir eventos de Kafka y actualizar la interfaz de usuario en tiempo real. — entregable (NO resolver): Interfaz de usuario que muestra el estado de las órdenes en tiempo real.
- Fase 3: Optimización y manejo de errores — objetivo: Optimizar el consumo de eventos y manejar posibles errores. — entregable (NO resolver): Sistema optimizado y robusto para el consumo y visualización de eventos en tiempo real.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "jest": "30.5.2",
    "kafkajs": "2.2.4",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
import { OrderStatus } from '../events/order-event';

export class Order {
  private readonly _id: string;
  private readonly _userId: string;
  private _status: OrderStatus;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private readonly _items: OrderItem[];
  private _metadata: Record<string, unknown>;

  constructor(
    id: string,
    userId: string,
    items: OrderItem[],
    metadata?: Record<string, unknown>,
  ) {
    if (!id || !userId || !items || items.length === 0) {
      throw new Error('Invalid order data');
    }

    this._id = id;
    this._userId = userId;
    this._status = { value: 'pending' };
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._items = items;
    this._metadata = metadata || {};
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get items(): OrderItem[] {
    return [...this._items];
  }

  get metadata(): Record<string, unknown> {
    return { ...this._metadata };
  }

  updateStatus(newStatus: OrderStatus): void {
    if (!newStatus || !newStatus.value) {
      throw new Error('Invalid status');
    }
    this._status = newStatus;
    this._updatedAt = new Date();
  }

  addMetadata(key: string, value: unknown): void {
    if (!key) {
      throw new Error('Metadata key cannot be empty');
    }
    this._metadata = { ...this._metadata, [key]: value };
    this._updatedAt = new Date();
  }
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
}

// === ARCHIVO: api/src/domain/ports/order-event.port.ts ===
import { Observable } from 'rxjs';
import { OrderEvent } from '../events/order-event';

export interface OrderEventPort {
  publish(event: OrderEvent): Promise<void>;
  subscribe(): Observable<OrderEvent>;
}

// === ARCHIVO: api/src/domain/events/order-event.ts ===
export interface OrderStatus {
  value: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface OrderEvent {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export class OrderEventFactory {
  static create(orderId: string, status: OrderStatus, metadata?: Record<string, unknown>): OrderEvent {
    return {
      id: this.generateId(),
      orderId,
      status,
      timestamp: new Date().toISOString(),
      metadata,
    };
  }

  private static generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}

// === ARCHIVO: api/src/application/services/order-event.service.ts ===
// TODO(reto): Implementar la lógica para manejar eventos de órdenes.
// Este servicio debe:
// 1. Consumir eventos del adaptador de Kafka
// 2. Procesar los eventos y actualizar el estado de las órdenes
// 3. Publicar eventos actualizados cuando sea necesario
// 4. Manejar errores y reconexiones

import { Injectable, Inject } from '@nestjs/common';
import { Observable, catchError, mergeMap } from 'rxjs';
import { OrderEvent, OrderEventFactory } from '../../domain/events/order-event';
import { OrderEventPort } from '../../domain/ports/order-event.port';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class OrderEventService {
  constructor(@Inject('OrderEventPort') private readonly orderEventPort: OrderEventPort) {}

  subscribeToOrderEvents(): Observable<OrderEvent> {
    return this.orderEventPort.subscribe().pipe(
      catchError((error) => {
        console.error('Error consuming order events:', error);
        throw error;
      }),
    );
  }

  async processOrderEvent(orderEvent: OrderEvent): Promise<OrderEvent> {
    // TODO(reto): Implementar lógica de procesamiento
    // 1. Validar el evento
    // 2. Actualizar el estado de la orden correspondiente
    // 3. Publicar evento actualizado si es necesario
    // 4. Manejar transiciones de estado válidas

    return OrderEventFactory.create(
      orderEvent.orderId,
      orderEvent.status,
      orderEvent.metadata,
    );
  }
}

// === ARCHIVO: api/src/infrastructure/messaging/kafka-order-event.adapter.ts ===
// TODO(reto): Implementar el adaptador para Kafka que:
// 1. Se conecte al broker de Kafka
// 2. Consuma eventos del topic de órdenes
// 3. Publique eventos en el topic de órdenes
// 4. Maneje errores de conexión y reconexiones

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';
import { Observable, Subject } from 'rxjs';
import { OrderEvent } from '../../domain/events/order-event';
import { OrderEventPort } from '../../domain/ports/order-event.port';

@Injectable()
export class KafkaOrderEventAdapter implements OrderEventPort, OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private readonly eventsSubject = new Subject<OrderEvent>();

  constructor() {
    this.kafka = new Kafka({
      clientId: 'order-service',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'order-service-group' });
  }

  async onModuleInit() {
    await this.connect();
    await this.subscribeToTopic();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect(): Promise<void> {
    try {
      await this.producer.connect();
      await this.consumer.connect();
    } catch (error) {
      console.error('Failed to connect to Kafka:', error);
      throw error;
    }
  }

  private async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      await this.consumer.disconnect();
    } catch (error) {
      console.error('Failed to disconnect from Kafka:', error);
    }
  }

  private async subscribeToTopic(): Promise<void> {
    try {
      await this.consumer.subscribe({
        topic: 'orders',
        fromBeginning: true,
      });

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
          if (message.value) {
            const event = JSON.parse(message.value.toString()) as OrderEvent;
            this.eventsSubject.next(event);
          }
        },
      });
    } catch (error) {
      console.error('Failed to subscribe to Kafka topic:', error);
      throw error;
    }
  }

  async publish(event: OrderEvent): Promise<void> {
    try {
      await this.producer.send({
        topic: 'orders',
        messages: [{ value: JSON.stringify(event) }],
      });
    } catch (error) {
      console.error('Failed to publish event to Kafka:', error);
      throw error;
    }
  }

  subscribe(): Observable<OrderEvent> {
    return this.eventsSubject.asObservable();
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/order-event.repository.ts ===
import { Injectable } from '@nestjs/common';
import { OrderEvent } from '../../domain/events/order-event';

@Injectable()
export class OrderEventRepository {
  private readonly events: OrderEvent[] = [];

  async save(event: OrderEvent): Promise<void> {
    this.events.push(event);
    // In a real implementation, this would persist to a database
  }

  async findByOrderId(orderId: string): Promise<OrderEvent[]> {
    return this.events.filter(event => event.orderId === orderId);
  }

  async findAll(): Promise<OrderEvent[]> {
    return [...this.events];
  }

  async findLatestByOrderId(orderId: string): Promise<OrderEvent | null> {
    const orderEvents = await this.findByOrderId(orderId);
    if (orderEvents.length === 0) {
      return null;
    }
    return orderEvents.reduce((latest, current) =>
      new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
    );
  }
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Aplicación corriendo en http://localhost:${port}`);
  console.log(`Endpoint de eventos SSE: GET /orders/events`);
}

bootstrap();

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderEventController } from './domain/events/order-event.controller';
import { OrderEventService } from './application/services/order-event.service';
import { KafkaOrderEventAdapter } from './infrastructure/messaging/kafka-order-event.adapter';
import { OrderEventRepository } from './infrastructure/repositories/order-event.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderEventController],
  providers: [
    {
      provide: 'OrderEventPort',
      useClass: KafkaOrderEventAdapter,
    },
    OrderEventService,
    OrderEventRepository,
  ],
  exports: [OrderEventService, OrderEventRepository],
})
export class AppModule {}

// === ARCHIVO: api/src/domain/events/order-event.controller.ts ===
import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { Observable, interval, map } from 'rxjs';
import { OrderEventService } from '../../application/services/order-event.service';
import { OrderEvent } from './order-event';

@Controller('orders')
export class OrderEventController {
  constructor(private readonly orderEventService: OrderEventService) {}

  @Get('events')
  async streamEvents(@Res() res: Response): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const observable = this.orderEventService.subscribeToOrderEvents();

    const subscription = observable.subscribe({
      next: (event: OrderEvent) => {
        const sseData = `data: ${JSON.stringify(event)}\n\n`;
        res.write(sseData);
      },
      error: (err) => {
        console.error('Error en stream de eventos:', err);
        res.write(`event: error\ndata: ${JSON.stringify({ message: 'Error en la conexión' })}\n\n`);
      },
      complete: () => {
        res.write('event: close\ndata: \n\n');
        res.end();
      },
    });

    res.on('close', () => {
      subscription.unsubscribe();
      res.end();
    });
  }

  @Sse('events-sse')
  sse(): Observable<{ data: OrderEvent }> {
    return this.orderEventService.subscribeToOrderEvents().pipe(
      map((event) => ({ data: event })),
    );
  }
}

// === ARCHIVO: client/src/app/app.component.ts ===
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    main {
      height: 100vh;
      width: 100%;
    }
  `]
})
export class AppComponent {}

// === ARCHIVO: client/package.json ===
{
  "name": "reto-angular",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "ng": "ng",
    "build": "ng build",
    "test": "jest"
  },
  "dependencies": {
    "@angular/animations": "19.2.25",
    "@angular/common": "19.2.25",
    "@angular/compiler": "19.2.25",
    "@angular/core": "19.2.25",
    "@angular/forms": "19.2.25",
    "@angular/platform-browser": "19.2.25",
    "@angular/platform-browser-dynamic": "19.2.25",
    "@angular/router": "19.2.25",
    "jest": "29.7.0",
    "rxjs": "7.8.2",
    "tslib": "2.9.1",
    "zone.js": "0.15.1"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "19.2.27",
    "@angular/cli": "19.2.27",
    "@angular/compiler-cli": "19.2.25",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: client/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "reto": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/reto",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB",
                  "maximumError": "2MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "16kB",
                  "maximumError": "32kB"
                }
              ],
              "outputHashing": "all"
            }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "strictPropertyInitialization": false,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: client/tsconfig.app.json ===
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: client/src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Reto</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>

// === ARCHIVO: client/src/styles.css ===
/* estilos globales */

// === ARCHIVO: client/src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

// === ARCHIVO: client/src/app/app.config.ts ===
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
    providers: [provideHttpClient(), provideRouter([])],
};

// === ARCHIVO: client/src/app/core/models/types/contract.types.ts ===
/**
 * Tipos definidos para el contrato entre cliente y servidor
 * para eventos y órdenes en tiempo real.
 */
export interface OrderEvent {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export type OrderStatus = {
  value: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};

// === ARCHIVO: client/src/app/core/models/order.model.ts ===
import { OrderEvent, OrderStatus } from './types/contract.types';

/**
 * Modelo de datos para representar una orden en el sistema.
 * Incluye lógica para manejar eventos y actualizar su estado.
 */
export class Order {
  private _id: string;
  private _status: OrderStatus;
  private _timestamp: Date;
  private _metadata: Record<string, unknown>;
  private _events: OrderEvent[] = [];

  constructor(
    id: string,
    status: OrderStatus,
    timestamp: string,
    metadata?: Record<string, unknown>
  ) {
    if (!id || !status || !timestamp) {
      throw new Error('Order requires id, status, and timestamp');
    }

    this._id = id;
    this._status = status;
    this._timestamp = new Date(timestamp);
    this._metadata = metadata || {};
  }

  get id(): string {
    return this._id;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get metadata(): Record<string, unknown> {
    return this._metadata;
  }

  get events(): OrderEvent[] {
    return [...this._events];
  }

  /**
   * Actualiza el estado de la orden basado en un nuevo evento.
   * @param event Evento recibido desde el servidor.
   */
  updateFromEvent(event: OrderEvent): void {
    if (event.orderId !== this._id) {
      throw new Error('Event does not belong to this order');
    }

    this._status = event.status;
    this._timestamp = new Date(event.timestamp);
    if (event.metadata) {
      this._metadata = { ...this._metadata, ...event.metadata };
    }
    this._events.push(event);
  }

  /**
   * Convierte la orden a un formato compatible con el contrato.
   * @returns Objeto plano con los datos de la orden.
   */
  toContract(): Omit<OrderEvent, 'id'> {
    return {
      orderId: this._id,
      status: this._status,
      timestamp: this._timestamp.toISOString(),
      metadata: this._metadata,
    };
  }
}

// === ARCHIVO: client/src/app/core/services/order-event.service.ts ===
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderEvent, OrderStatus } from '../models/types/contract.types';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar la conexión SSE con el servidor
 * y procesar eventos de órdenes en tiempo real.
 * Implementa reconexión automática y manejo de errores.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderEventService {
  private readonly apiUrl = environment.apiUrl;
  private readonly sseEndpoint = environment.sseEndpoint;
  private readonly maxReconnectAttempts = environment.reconnectAttempts;
  private readonly reconnectDelay = environment.reconnectDelay;
  private readonly eventRetryCount = environment.eventRetryCount;

  private ordersSignal = signal<Order[]>([]);
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private isConnecting = false;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el estado reactivo de las órdenes.
   * Retorna una señal de solo lectura para prevenir modificaciones directas.
   */
  get orders() {
    return this.ordersSignal.asReadonly();
  }

  /**
   * Obtiene el estado actual de las órdenes como array.
   * Útil para iteraciones y operaciones de array.
   */
  getCurrentOrders(): Order[] {
    return this.ordersSignal();
  }

  /**
   * Inicia la conexión SSE para recibir eventos de órdenes.
   * Implementa verificación de conexión existente y manejo de estados.
   */
  connect(): void {
    if (this.eventSource || this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    const fullUrl = `${this.apiUrl}${this.sseEndpoint}`;

    try {
      this.eventSource = new EventSource(fullUrl, {
        withCredentials: true,
      });

      this.eventSource.onopen = () => {
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        if (environment.enableDebugLogs) {
          console.log('[OrderEventService] SSE connection established');
        }
      };

      this.eventSource.onmessage = (event) => {
        try {
          const orderEvent: OrderEvent = JSON.parse(event.data);
          this.processEvent(orderEvent);
          this.reconnectAttempts = 0;
        } catch (error) {
          console.error('[OrderEventService] Error parsing event:', error);
        }
      };

      this.eventSource.onerror = (error) => {
        this.isConnecting = false;
        this.handleConnectionError(error);
      };
    } catch (error) {
      this.isConnecting = false;
      console.error('[OrderEventService] Failed to create EventSource:', error);
    }
  }

  /**
   * Maneja errores de conexión e implementa reconexión automática.
   * @param error Evento de error del EventSource.
   */
  private handleConnectionError(error: Event): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      if (environment.enableDebugLogs) {
        console.log(
          `[OrderEventService] Connection error. Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
        );
      }

      this.eventSource?.close();
      this.eventSource = null;

      setTimeout(() => this.connect(), delay);
    } else {
      console.error(
        '[OrderEventService] Max reconnection attempts reached. Connection failed.'
      );
      this.eventSource?.close();
      this.eventSource = null;
    }
  }

  /**
   * Procesa un evento de orden y actualiza el estado reactivo.
   * Maneja tanto actualización de órdenes existentes como creación de nuevas.
   * @param event Evento recibido desde el servidor.
   */
  private processEvent(event: OrderEvent): void {
    const currentOrders = this.ordersSignal();
    const existingOrderIndex = currentOrders.findIndex(
      (order) => order.id === event.orderId
    );

    if (existingOrderIndex >= 0) {
      const updatedOrders = [...currentOrders];
      const existingOrder = updatedOrders[existingOrderIndex];
      existingOrder.updateFromEvent(event);
      updatedOrders[existingOrderIndex] = existingOrder;
      this.ordersSignal.set(updatedOrders);

      if (environment.enableDebugLogs) {
        console.log(
          `[OrderEventService] Updated order ${event.orderId} to status ${event.status.value}`
        );
      }
    } else {
      const newOrder = new Order(
        event.orderId,
        event.status,
        event.timestamp,
        event.metadata
      );
      newOrder.updateFromEvent(event);
      this.ordersSignal.set([...currentOrders, newOrder]);

      if (environment.enableDebugLogs) {
        console.log(
          `[OrderEventService] Created new order ${event.orderId} with status ${event.status.value}`
        );
      }
    }
  }

  /**
   * Obtiene el historial de eventos para una orden específica.
   * Implementa reintentos automáticos y manejo de errores.
   * @param orderId ID de la orden.
   * @returns Observable con el historial de eventos.
   */
  getOrderEvents(orderId: string): Observable<OrderEvent[]> {
    return this.http
      .get<OrderEvent[]>(`${this.apiUrl}/orders/${orderId}/events`)
      .pipe(
        retry(this.eventRetryCount),
        catchError((error) => {
          console.error(
            `[OrderEventService] Error fetching order events for ${orderId}:`,
            error
          );
          return throwError(
            () => new Error(`Failed to fetch order events for order: ${orderId}`)
          );
        })
      );
  }

  /**
   * Obtiene una orden específica por su ID.
   * @param orderId ID de la orden a buscar.
   * @returns La orden encontrada o undefined.
   */
  getOrderById(orderId: string): Order | undefined {
    return this.ordersSignal().find((order) => order.id === orderId);
  }

  /**
   * Limpia todas las órdenes del estado.
   * Útil para pruebas o reset de la aplicación.
   */
  clearOrders(): void {
    this.ordersSignal.set([]);
  }

  /**
   * Cierra la conexión SSE y limpia el estado.
   * Debe llamarse al destruir el componente que usa el servicio.
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.isConnecting = false;
      this.reconnectAttempts = 0;

      if (environment.enableDebugLogs) {
        console.log('[OrderEventService] SSE connection closed');
      }
    }
  }

  /**
   * Verifica si hay una conexión activa.
   * @returns true si hay una conexión SSE activa.
   */
  isConnected(): boolean {
    return this.eventSource !== null && this.eventSource.readyState === EventSource.OPEN;
  }

  /**
   * Obtiene el número de reintentos de conexión actuales.
   * Útil para debugging y métricas.
   */
  getReconnectAttempts(): number {
    return this.reconnectAttempts;
  }
}

// === ARCHIVO: client/src/app/features/orders/orders.component.ts ===
import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { OrderEventService } from '../../core/services/order-event.service';
import { Order } from '../../core/models/order.model';
import { CommonModule } from '@angular/common';
import { OrderStatusBadgeComponent } from '../../shared/components/order-status-badge.component';

/**
 * Componente contenedor para la visualización y gestión de órdenes.
 * Maneja la lógica de suscripción a eventos y actualización del estado.
 */
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderStatusBadgeComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private orderEventService: OrderEventService) {
    effect(() => {
      this.orders = this.orderEventService.orders();
    });
  }

  ngOnInit(): void {
    this.orderEventService.connect();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.orderEventService.disconnect();
  }

  /**
   * Carga datos iniciales de órdenes desde el servidor.
   */
  private loadInitialData(): void {
    this.isLoading = true;
    this.error = null;

    // Simulación de carga inicial (en un caso real, se haría con una API REST)
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Maneja errores de conexión o procesamiento.
   * @param message Mensaje de error.
   */
  private handleError(message: string): void {
    this.error = message;
    this.isLoading = false;
  }

  /**
   * Obtiene el historial de eventos para una orden específica.
   * @param orderId ID de la orden.
   */
  viewOrderHistory(orderId: string): void {
    this.orderEventService.getOrderEvents(orderId).subscribe({
      next: (events) => {
        console.log('Order events:', events);
      },
      error: (err) => {
        this.handleError('Failed to load order history');
      },
    });
  }
}

// === ARCHIVO: client/src/app/shared/components/order-status-badge.component.ts ===
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../core/models/types/contract.types';

/**
 * Componente presentacional para mostrar el estado de una orden
 * con estilos visuales diferenciados según el estado.
 */
@Component({
  selector: 'app-order-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="order-status-badge" [class]="statusClass">
      {{ statusText }}
    </span>
  `,
  styles: [
    `
      .order-status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: bold;
        text-transform: capitalize;
        display: inline-block;
      }

      .pending {
        background-color: #fff3cd;
        color: #856404;
      }

      .processing {
        background-color: #cce5ff;
        color: #004085;
      }

      .shipped {
        background-color: #d4edda;
        color: #155724;
      }

      .delivered {
        background-color: #d1ecf1;
        color: #0c5460;
      }

      .cancelled {
        background-color: #f8d7da;
        color: #721c24;
      }
    `,
  ],
})
export class OrderStatusBadgeComponent {
  @Input() status!: OrderStatus;

  /**
   * Obtiene la clase CSS correspondiente al estado de la orden.
   */
  get statusClass(): string {
    return this.status?.value || 'pending';
  }

  /**
   * Obtiene el texto legible para el estado de la orden.
   */
  get statusText(): string {
    return this.status?.value.replace('-', ' ') || 'unknown';
  }
}

// === ARCHIVO: client/src/app/features/orders/orders.component.html ===
<div class="orders-container">
  <header class="orders-header">
    <h1 class="orders-header__title">Panel de Órdenes</h1>
    <p class="orders-header__subtitle">Seguimiento en tiempo real del estado de tus órdenes</p>
  </header>

  @if (error) {
    <div class="orders-error" role="alert">
      <svg class="orders-error__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <div class="orders-error__content">
        <p class="orders-error__message">{{ error }}</p>
        <button class="orders-error__retry" (click)="loadInitialData()">Reintentar</button>
      </div>
    </div>
  }

  <section class="orders-section" aria-label="Lista de órdenes">
    @if (orders.length === 0 && !error) {
      <div class="orders-empty">
        <svg class="orders-empty__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <p class="orders-empty__text">No hay órdenes disponibles en este momento</p>
        <p class="orders-empty__hint">Los eventos de órdenes aparecerán aquí automáticamente</p>
      </div>
    } @else {
      <div class="orders-list">
        @for (order of orders; track order.id) {
          <article class="order-card" (click)="viewOrderHistory(order.id)" tabindex="0" role="button" aria-label="Ver historial de orden {{ order.id }}">
            <div class="order-card__header">
              <h2 class="order-card__id">
                <span class="order-card__label">Orden</span>
                <span class="order-card__value">#{{ order.id }}</span>
              </h2>
              <app-order-status-badge [status]="order.status" class="order-card__badge"></app-order-status-badge>
            </div>
            <div class="order-card__body">
              <div class="order-card__info">
                <time class="order-card__timestamp" [attr.datetime]="order.timestamp.toISOString()">
                  {{ order.timestamp | date:'medium' }}
                </time>
                @if (order.events.length > 0) {
                  <span class="order-card__events">
                    <svg class="order-card__events-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                    </svg>
                    {{ order.events.length }} evento{{ order.events.length !== 1 ? 's' : '' }}
                  </span>
                }
              </div>
              @if (order.metadata && (order.metadata['customerName'] || order.metadata['total'])) {
                <dl class="order-card__metadata">
                  @if (order.metadata['customerName']) {
                    <div class="order-card__meta-item">
                      <dt class="order-card__meta-label">Cliente</dt>
                      <dd class="order-card__meta-value">{{ order.metadata['customerName'] }}</dd>
                    </div>
                  }
                  @if (order.metadata['total']) {
                    <div class="order-card__meta-item">
                      <dt class="order-card__meta-label">Total</dt>
                      <dd class="order-card__meta-value">{{ order.metadata['total'] | currency }}</dd>
                    </div>
                  }
                </dl>
              }
            </div>
            <div class="order-card__footer">
              <span class="order-card__cta">Ver historial completo</span>
              <svg class="order-card__arrow" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </div>
          </article>
        }
      </div>
    }
  </section>

  <aside class="orders-stats" aria-label="Estadísticas de órdenes">
    <h3 class="orders-stats__title">Resumen</h3>
    <dl class="orders-stats__list">
      <div class="orders-stats__item">
        <dt class="orders-stats__label">Total de órdenes</dt>
        <dd class="orders-stats__value">{{ orders.length }}</dd>
      </div>
      <div class="orders-stats__item">
        <dt class="orders-stats__label">Pendientes</dt>
        <dd class="orders-stats__value">{{ orders | filterStatus:'pending' }}</dd>
      </div>
      <div class="orders-stats__item">
        <dt class="orders-stats__label">En proceso</dt>
        <dd class="orders-stats__value">{{ orders | filterStatus:'processing' }}</dd>
      </div>
      <div class="orders-stats__item">
        <dt class="orders-stats__label">Enviadas</dt>
        <dd class="orders-stats__value">{{ orders | filterStatus:'shipped' }}</dd>
      </div>
      <div class="orders-stats__item">
        <dt class="orders-stats__label">Entregadas</dt>
        <dd class="orders-stats__value">{{ orders | filterStatus:'delivered' }}</dd>
      </div>
      <div class="orders-stats__item">
        <dt class="orders-stats__label">Canceladas</dt>
        <dd class="orders-stats__value">{{ orders | filterStatus:'cancelled' }}</dd>
      </div>
    </dl>
  </aside>
</div>

// === ARCHIVO: client/src/app/features/orders/orders.component.scss ===
// Variables de tema
$color-primary: #1976d2;
$color-primary-dark: #1565c0;
$color-primary-light: #42a5f5;
$color-success: #2e7d32;
$color-warning: #ed6c02;
$color-error: #d32f2f;
$color-info: #0288d1;

$color-text-primary: #212121;
$color-text-secondary: #757575;
$color-text-disabled: #9e9e9e;
$color-text-inverse: #ffffff;

$color-background: #fafafa;
$color-surface: #ffffff;
$color-surface-hover: #f5f5f5;
$color-border: #e0e0e0;
$color-border-light: #eeeeee;

$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;

$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);

$transition-fast: 150ms ease-in-out;
$transition-normal: 250ms ease-in-out;
$transition-slow: 350ms ease-in-out;

$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-md: 1rem;
$font-size-lg: 1.25rem;
$font-size-xl: 1.5rem;
$font-size-xxl: 2rem;

$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Mixins
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin card-base {
  background: $color-surface;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;
  transition: box-shadow $transition-normal, transform $transition-normal;
}

// Estilos del componente
.orders-container {
  display: grid;
  grid-template-columns: 1fr 280px;
  grid-template-rows: auto 1fr;
  gap: $spacing-lg;
  min-height: calc(100vh - 48px);
  padding: $spacing-lg;
  background: $color-background;
  font-family: $font-family-base;
  color: $color-text-primary;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    padding: $spacing-md;
    gap: $spacing-md;
  }
}

.orders-header {
  grid-column: 1 / -1;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $color-border-light;

  &__title {
    margin: 0 0 $spacing-xs;
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: 1.2;
  }

  &__subtitle {
    margin: 0;
    font-size: $font-size-md;
    color: $color-text-secondary;
  }
}

.orders-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.orders-error {
  @include card-base;
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: #ffebee;
  border-left: 4px solid $color-error;
  animation: slideIn $transition-normal ease-out;

  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: $color-error;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__message {
    margin: 0;
    font-size: $font-size-md;
    color: $color-error;
    font-weight: $font-weight-medium;
  }

  &__retry {
    align-self: flex-start;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-inverse;
    background: $color-error;
    border: none;
    border-radius: $border-radius-sm;
    cursor: pointer;
    transition: background $transition-fast, transform $transition-fast;

    &:hover {
      background: darken($color-error, 10%);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.orders-empty {
  @include card-base;
  @include flex-center;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-xl * 2;
  text-align: center;
  animation: fadeIn $transition-slow ease-out;

  &__icon {
    width: 64px;
    height: 64px;
    color: $color-text-disabled;
    opacity: 0.6;
  }

  &__text {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__hint {
    margin: 0;
    font-size: $font-size-sm;
    color: $color-text-disabled;
  }
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.order-card {
  @include card-base;
  display: flex;
  flex-direction: column;
  padding: $spacing-lg;
  cursor: pointer;
  transition: box-shadow $transition-normal, transform $transition-normal, background $transition-fast;
  animation: slideUp $transition-normal ease-out;

  &:hover {
    box-shadow: $shadow-md;
    transform: translateY(-2px);
    background: $color-surface-hover;
  }

  &:focus {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
    box-shadow: $shadow-sm;
  }

  &__header {
    @include flex-between;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $color-border-light;
  }

  &__id {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    margin: 0;
  }

  &__label {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__value {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__badge {
    flex-shrink: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__info {
    @include flex-between;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }

  &__timestamp {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__events {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-primary;
    font-weight: $font-weight-medium;
  }

  &__events-icon {
    width: 16px;
    height: 16px;
  }

  &__metadata {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: $spacing-md;
    margin: 0;
    padding: $spacing-md;
    background: $color-background;
    border-radius: $border-radius-sm;
  }

  &__meta-item {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__meta-label {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__meta-value {
    margin: 0;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__footer {
    @include flex-between;
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid $color-border-light;
  }

  &__cta {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-primary;
    transition: color $transition-fast;
  }

  &__arrow {
    width: 20px;
    height: 20px;
    color: $color-primary;
    transition: transform $transition-fast;
  }

  &:hover &__arrow {
    transform: translateX(4px);
  }
}

.orders-stats {
  @include card-base;
  padding: $spacing-lg;
  height: fit-content;
  position: sticky;
  top: $spacing-lg;
  animation: fadeIn $transition-slow ease-out;

  @media (max-width: 1024px) {
    position: static;
  }

  &__title {
    margin: 0 0 $spacing-md;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $color-border-light;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin: 0;
  }

  &__item {
    @include flex-between;
    padding: $spacing-sm 0;
    border-bottom: 1px solid $color-border-light;

    &:last-child {
      border-bottom: none;
    }
  }

  &__label {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__value {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }
}

// Animaciones
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Accesibilidad
@media (prefers-reduced-motion: reduce) {
  .orders-error,
  .orders-empty,
  .order-card,
  .orders-stats {
    animation: none;
    transition: none;
  }

  .order-card:hover {
    transform: none;
  }

  .order-card:hover .order-card__arrow {
    transform: none;
  }
}

// High contrast mode
@media (prefers-contrast: high) {
  .orders-container {
    background: #ffffff;
  }

  .order-card,
  .orders-empty,
  .orders-error,
  .orders-stats {
    border: 2px solid $color-text-primary;
    box-shadow: none;
  }

  .orders-error {
    border-left-width: 6px;
  }
}

// === ARCHIVO: client/src/app/core/services/order-event.service.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderEventService } from './order-event.service';
import { OrderEvent, OrderStatus } from '../models/types/contract.types';

describe('OrderEventService', () => {
  let service: OrderEventService;
  let httpMock: HttpTestingController;

  const mockOrderEvent: OrderEvent = {
    id: 'evt-001',
    orderId: 'order-123',
    status: { value: 'pending' },
    timestamp: new Date().toISOString(),
    metadata: { customerId: 'cust-456' }
  };

  const mockOrderStatus: OrderStatus = { value: 'processing' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderEventService]
    });

    service = TestBed.inject(OrderEventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.disconnect();
  });

  describe('connect', () => {
    it('debe establecer conexión con el servidor de eventos', () => {
      const originalEventSource = global.EventSource;
      const mockEventSource = jest.fn().mockImplementation(() => ({
        onmessage: null,
        onerror: null,
        close: jest.fn()
      }));

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: mockEventSource
      });

      service.connect();

      expect(mockEventSource).toHaveBeenCalledWith(
        'http://localhost:3000/orders/events',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'text/event-stream'
          })
        })
      );

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: originalEventSource
      });
    });

    it('debe manejar errores de conexión correctamente', () => {
      const originalEventSource = global.EventSource;
      const mockClose = jest.fn();

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
          onmessage: null,
          onerror: jest.fn(),
          close: mockClose
        }))
      });

      service.connect();
      service.disconnect();

      expect(mockClose).toHaveBeenCalled();

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: originalEventSource
      });
    });
  });

  describe('getOrderEvents', () => {
    it('debe retornar observable con eventos de una orden específica', (done) => {
      const orderId = 'order-123';
      const mockEvents: OrderEvent[] = [mockOrderEvent];

      service.getOrderEvents(orderId).subscribe(events => {
        expect(events).toEqual(mockEvents);
        done();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/orders/${orderId}/events`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEvents);
    });

    it('debe manejar error cuando la API falla', (done) => {
      const orderId = 'order-123';

      service.getOrderEvents(orderId).subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
          done();
        }
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/orders/${orderId}/events`);
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('disconnect', () => {
    it('debe cerrar la conexión de eventos existente', () => {
      const originalEventSource = global.EventSource;
      const mockClose = jest.fn();

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
          onmessage: null,
          onerror: null,
          close: mockClose
        }))
      });

      service.connect();
      service.disconnect();

      expect(mockClose).toHaveBeenCalled();

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: originalEventSource
      });
    });

    it('debe manejar desconexión cuando no hay conexión activa', () => {
      expect(() => service.disconnect()).not.toThrow();
    });
  });

  describe('orders signal', () => {
    it('debe inicializar con un array vacío de órdenes', () => {
      const orders = service.orders;
      expect(orders).toEqual([]);
    });

    it('debe actualizar el signal cuando se procesa un evento', () => {
      const originalEventSource = global.EventSource;
      let onMessageHandler: ((event: MessageEvent) => void) | null = null;

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: jest.fn().mockImplementation((url: string, options: EventSourceInit) => ({
          onmessage: null,
          onerror: null,
          close: jest.fn()
        }))
      });

      service.connect();
      const ordersBefore = service.orders;
      expect(ordersBefore).toEqual([]);

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: originalEventSource
      });
    });
  });

  describe('procesamiento de eventos', () => {
    it('debe procesar evento de orden correctamente', () => {
      const originalEventSource = global.EventSource;
      let capturedOnMessage: ((event: any) => void) | null = null;

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
          onmessage: null,
          set onmessage(handler: ((event: any) => void) | null) {
            capturedOnMessage = handler;
          },
          onerror: null,
          close: jest.fn()
        }))
      });

      service.connect();

      if (capturedOnMessage) {
        const mockMessageEvent = {
          data: JSON.stringify(mockOrderEvent)
        };
        capturedOnMessage(mockMessageEvent);
      }

      const orders = service.orders;
      expect(orders.length).toBeGreaterThanOrEqual(0);

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: originalEventSource
      });
    });

    it('debe manejar evento con estado cancelled correctamente', () => {
      const cancelledEvent: OrderEvent = {
        id: 'evt-002',
        orderId: 'order-456',
        status: { value: 'cancelled' },
        timestamp: new Date().toISOString(),
        metadata: { reason: 'Customer request' }
      };

      expect(cancelledEvent.status.value).toBe('cancelled');
    });
  });

  describe('reconexión automática', () => {
    it('debe intentar reconectar cuando se pierde la conexión', () => {
      const originalEventSource = global.EventSource;
      let errorCount = 0;
      const maxAttempts = 3;

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
          onmessage: null,
          onerror: () => {
            errorCount++;
          },
          close: jest.fn()
        }))
      });

      service.connect();

      for (let i = 0; i < maxAttempts; i++) {
        const eventSource = (global as any).EventSource.mock.results[i]?.value;
        if (eventSource?.onerror) {
          eventSource.onerror();
        }
      }

      expect(errorCount).toBeGreaterThanOrEqual(0);

      Object.defineProperty(global, 'EventSource', {
        writable: true,
        value: originalEventSource
      });
    });
  });

  describe('manejo de estados de orden', () => {
    const estadosValidos: Array<OrderStatus['value']> = [
      'pending',
      'processing',
      'shipped',
      'delivered',
      'cancelled'
    ];

    estadosValidos.forEach(estado => {
      it(`debe manejar estado '${estado}' correctamente`, () => {
        const evento: OrderEvent = {
          id: `evt-${estado}`,
          orderId: `order-${estado}`,
          status: { value: estado },
          timestamp: new Date().toISOString()
        };

        expect(evento.status.value).toBe(estado);
      });
    });
  });

  describe('integración con contrato', () => {
    it('debe cumplir con el esquema OrderEvent del contrato', () => {
      const evento: OrderEvent = {
        id: 'evt-test',
        orderId: 'order-test',
        status: { value: 'pending' },
        timestamp: '2024-01-15T10:30:00.000Z',
        metadata: { test: true }
      };

      expect(evento).toHaveProperty('id');
      expect(evento).toHaveProperty('orderId');
      expect(evento).toHaveProperty('status');
      expect(evento).toHaveProperty('timestamp');
      expect(evento).toHaveProperty('metadata');
    });

    it('debe manejar eventos sin metadata opcional', () => {
      const eventoSinMetadata: OrderEvent = {
        id: 'evt-no-meta',
        orderId: 'order-no-meta',
        status: { value: 'delivered' },
        timestamp: '2024-01-15T12:00:00.000Z'
      };

      expect(eventoSinMetadata.metadata).toBeUndefined();
    });
  });
});

// === ARCHIVO: client/src/app/environments/environment.ts ===
/**
 * Configuración del entorno de la aplicación.
 * Define las URLs y parámetros de conexión a servicios externos.
 */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  sseEndpoint: '/orders/events',
  reconnectAttempts: 5,
  reconnectDelay: 1000,
  eventRetryCount: 2,
  maxConcurrentConnections: 10,
  requestTimeout: 30000,
  enableDebugLogs: true,
};
/**
 * Alias tipado para el entorno actual.
 * Facilita la inyección y testing del servicio de configuración.
 */
export type AppEnvironment = typeof environment;

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  kafka:
    image: "apache/kafka:3.8.0"
    ports:
      - "127.0.0.1:9092:9092"
    environment:
      KAFKA_NODE_ID: "1"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_LISTENERS: "PLAINTEXT://:9092,CONTROLLER://:9093"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://localhost:9092"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@localhost:9093"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: "1"
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: "0"
    healthcheck:
      test: ["CMD-SHELL","/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092 > /dev/null 2>&1"]
      interval: 15s
      timeout: 10s
      retries: 10
      start_period: 30s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| Apache Kafka (KRaft, un nodo) | `apache/kafka:3.8.0` | 9092 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/kafka/create-topics.sh ===
#!/usr/bin/env bash
# Crea los topics en Kafka local (idempotente). Ejecutar con el compose levantado y healthy.
set -euo pipefail

docker compose exec -T kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic app-events --partitions 1 --replication-factor 1

```
