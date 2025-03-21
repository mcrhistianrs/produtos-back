import { Inject, Injectable } from '@nestjs/common';

import { Product } from '../../domain/entities/product';
import { IProductDAO } from '../../domain/interface/interface-product';
import { CreateProductDto } from '../dto/create-product-dto';
import { ProductDto } from '../dto/product-dto';
import { ProductMapper } from '../mapper/product-mapper';

@Injectable()
class CreateProductUseCase {
  constructor(
    @Inject('ProductDAO')
    private readonly productDAO: IProductDAO,
  ) {}

  async execute(input: CreateProductDto): Promise<ProductDto> {
    const product = Product.create({
      name: input.name,
      category: input.category,
      price: input.price,
      description: input.description,
      imageUrl: input.imageUrl,
      quantityInStock: input.quantityInStock,
    });
    const productDatabase = await this.productDAO.create(product);
    const productDomain = ProductMapper.toDomain(productDatabase);
    return ProductMapper.toOutput(productDomain);
  }
}

export { CreateProductUseCase };
