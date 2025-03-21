import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './app/dto/create-product-dto';
import { FindAllDto } from './app/dto/find-all-dto';
import { ProductDto } from './app/dto/product-dto';
import { UpdateProductDto } from './app/dto/update-product-dto';
import { ProductMapper } from './app/mapper/product-mapper';
import { CreateProductUseCase } from './app/use-cases/create-product-use-case';
import { FindAllProductUseCase } from './app/use-cases/find-all-product-use-case';
import { UpdateProductUseCase } from './app/use-cases/update-product-use-case';

@Controller('products')
class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateProductDto,
  ): Promise<ProductDto> {
    input.id = id;
    return this.updateProductUseCase.execute(input);
  }
}

export { ProductController };
