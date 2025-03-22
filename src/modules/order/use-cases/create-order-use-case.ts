import { Inject, Injectable } from '@nestjs/common';

import { CreateOrderDto } from '../app/dto/create-order-dto';
import { OrderDto } from '../app/dto/order-dto';
import { StatusEnum } from '../app/enums/status-enum';
import { OrderMapper } from '../app/mapper/order-mapper';
import { Order } from '../domain/entities/order';
import { IOrderRepository } from '../domain/inteface/interface-repository';

@Injectable()
class CreateOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(input: CreateOrderDto): Promise<OrderDto> {
    const order = Order.create({
      items: input.items,
      total: input.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      status: StatusEnum.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const orderDomain = await this.orderRepository.create(order);
    return OrderMapper.toOutput(orderDomain);
  }
}

export { CreateOrderUseCase };
