import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { OrderDto } from '../app/dto/order-dto';
import { UpdateOrderDto } from '../app/dto/update-order-dto';
import { StatusEnum } from '../app/enums/status-enum';
import { OrderMapper } from '../app/mapper/order-mapper';
import { Order } from '../domain/entities/order';
import { IOrderRepository } from '../domain/inteface/interface-repository';

interface ProductWithId {
  _id: {
    toString(): string;
  };
  toString(): string;
}

@Injectable()
class UpdateOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(input: UpdateOrderDto): Promise<OrderDto> {
    const existingOrder = await this.orderRepository.findById(input.id);

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${input.id} not found`);
    }

    let items = existingOrder.items;

    if (input.items) {
      items = input.items;
    }

    const normalizedItems = items.map((item) => {
      let productIdStr = '';

      if (item.productId) {
        if (typeof item.productId === 'string') {
          productIdStr = item.productId;
        } else if (typeof item.productId === 'object') {
          const productObj = item.productId as ProductWithId;

          if (productObj._id) {
            productIdStr = productObj._id.toString();
          } else {
            productIdStr = productObj.toString();
          }
        }
      }

      return {
        productId: productIdStr,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const updatedFields = {
      _id: existingOrder.id,
      items: normalizedItems,
      total: existingOrder.total,
      status: input.status || existingOrder.status,
      createdAt: existingOrder.createdAt,
      updatedAt: new Date(),
    };

    const updatedOrder = Order.create(updatedFields);

    if (
      input.status === StatusEnum.CONCLUDED &&
      existingOrder.status !== StatusEnum.CONCLUDED
    ) {
      const concludedOrder = await this.orderRepository.updateStatus(
        input.id,
        StatusEnum.CONCLUDED,
      );
      return OrderMapper.toOutput(concludedOrder);
    }

    const savedOrder = await this.orderRepository.update(
      input.id,
      updatedOrder,
    );
    return OrderMapper.toOutput(savedOrder);
  }
}

export { UpdateOrderUseCase };
