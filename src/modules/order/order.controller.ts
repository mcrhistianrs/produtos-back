import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './app/dto/create-order-dto';
import { OrderDto } from './app/dto/order-dto';
import { CreateOrderUseCase } from './use-cases/create-order-use-case';

@Controller('orders')
class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async create(@Body() input: CreateOrderDto): Promise<OrderDto> {
    return this.createOrderUseCase.execute(input);
  }
}

export { OrderController };
