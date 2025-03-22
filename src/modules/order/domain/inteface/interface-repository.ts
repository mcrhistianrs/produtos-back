import { StatusEnum } from '../../app/enums/status-enum';
import { Order } from '../entities/order';

interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order>;
  update(id: string, order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, status: StatusEnum): Promise<Order>;
}

export { IOrderRepository };
