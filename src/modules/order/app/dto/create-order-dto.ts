import { OrderItem } from '../../domain/entities/order';

class CreateOrderDto {
  items: OrderItem[];
}

export { CreateOrderDto };
