import { Order } from '../entities/order';

interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order>;
  update(id: string, order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}

export { IOrderRepository };
