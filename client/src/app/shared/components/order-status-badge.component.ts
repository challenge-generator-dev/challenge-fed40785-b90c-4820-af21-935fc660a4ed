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