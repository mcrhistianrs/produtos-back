import { Types } from 'mongoose';
import { StatusEnum } from '../../app/enums/status-enum';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderFields {
  _id?: string;
  items: OrderItem[];
  total: number;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

class Order {
  constructor(
    private fields: OrderFields,
    id?: string,
  ) {
    this.fields = {
      ...fields,
      _id: id || fields._id || new Types.ObjectId().toString(),
      status: fields.status || StatusEnum.PENDING,
      createdAt: fields.createdAt || new Date(),
      updatedAt: fields.updatedAt || new Date(),
    };
  }

  static create(fields: OrderFields, id?: string) {
    return new Order(fields, id);
  }

  get id(): string {
    return this.fields._id;
  }

  get items(): OrderItem[] {
    return this.fields.items;
  }
  set items(items: OrderItem[]) {
    this.fields.items = items;
    this.calculateTotal();
  }

  get total(): number {
    return this.fields.total;
  }

  get status(): StatusEnum {
    return this.fields.status;
  }
  set status(status: StatusEnum) {
    this.fields.status = status;
    this.fields.updatedAt = new Date();
  }

  get createdAt(): Date {
    return this.fields.createdAt;
  }

  get updatedAt(): Date {
    return this.fields.updatedAt;
  }

  private calculateTotal(): void {
    this.fields.total = this.fields.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  addItem(item: OrderItem): void {
    this.fields.items.push(item);
    this.calculateTotal();
  }

  removeItem(productId: string): void {
    this.fields.items = this.fields.items.filter(
      (item) => item.productId !== productId,
    );
    this.calculateTotal();
  }

  updateItemQuantity(productId: string, quantity: number): void {
    const item = this.fields.items.find((item) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotal();
    }
  }
}

export { Order, OrderFields, OrderItem, StatusEnum };
