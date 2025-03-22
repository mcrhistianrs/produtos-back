import { OrderItem } from '../../domain/entities/order';
import { StatusEnum } from '../enums/status-enum';

class OrderDto {
  id: string;
  items: OrderItem[];
  total: number;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
export { OrderDto };
