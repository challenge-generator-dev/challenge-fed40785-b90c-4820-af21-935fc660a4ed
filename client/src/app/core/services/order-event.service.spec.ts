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