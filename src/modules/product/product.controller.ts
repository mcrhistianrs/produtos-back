import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './app/dto/create-product-dto';
import { FindAllDto } from './app/dto/find-all-dto';
import { ProductDto } from './app/dto/product-dto';
import { ProductMapper } from './app/mapper/product-mapper';
import { CreateProductUseCase } from './app/use-cases/create-product-use-case';
import { FindAllProductUseCase } from './app/use-cases/find-all-product-use-case';

@Controller('products')
class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
  ) {}

  @Post()
  async create(@Body() input: CreateProductDto): Promise<ProductDto> {
    return this.createProductUseCase.execute(input);
  }

  @Get()
  async findAll(@Query() input: FindAllDto): Promise<ProductDto[]> {
    const products = await this.findAllProductUseCase.execute(input);
    return products.map((product) => ProductMapper.toOutput(product));
  }
}

export { ProductController };
