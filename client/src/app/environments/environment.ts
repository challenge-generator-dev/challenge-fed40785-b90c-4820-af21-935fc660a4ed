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