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