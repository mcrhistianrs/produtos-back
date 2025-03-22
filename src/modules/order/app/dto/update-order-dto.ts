import { OrderItem } from '../../domain/entities/order';
import { StatusEnum } from '../enums/status-enum';

class UpdateOrderDto {
  id: string;
  items?: OrderItem[];
  status?: StatusEnum;
}

export { UpdateOrderDto };
