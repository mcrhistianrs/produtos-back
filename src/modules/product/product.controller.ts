import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './app/dto/create-product-dto';
import { ProductDto } from './app/dto/product-dto';
import { CreateProductUseCase } from './app/use-cases/create-product-use-case';

@Controller('products')
class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async create(@Body() input: CreateProductDto): Promise<ProductDto> {
    return this.createProductUseCase.execute(input);
  }
}

export { ProductController };
