import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './app/dto/create-order-dto';
import { OrderDto } from './app/dto/order-dto';
import { UpdateOrderDto } from './app/dto/update-order-dto';
import { SwaggerCreateOrder } from './app/swagger/swagger-create-order';
import { SwaggerUpdateOrder } from './app/swagger/swagger-update-order';
import { CreateOrderUseCase } from './use-cases/create-order-use-case';
import { UpdateOrderUseCase } from './use-cases/update-order-use-case';

@Controller('orders')
class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
  ) {}

  @Post()
  @SwaggerCreateOrder()
  async create(@Body() input: CreateOrderDto): Promise<OrderDto> {
    return this.createOrderUseCase.execute(input);
  }

  @Patch(':id')
  @SwaggerUpdateOrder()
  async update(
    @Param('id') id: string,
    @Body() input: UpdateOrderDto,
  ): Promise<OrderDto> {
    input.id = id;
    return this.updateOrderUseCase.execute(input);
  }
}

export { OrderController };
