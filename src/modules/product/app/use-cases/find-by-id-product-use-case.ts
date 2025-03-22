import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IProductDAO } from '../../domain/interface/interface-product';
import { FindByIdProductDto } from '../dto/find-by-id-product-dto';
import { ProductDto } from '../dto/product-dto';
import { ProductMapper } from '../mapper/product-mapper';

@Injectable()
class FindByIdProductUseCase {
  constructor(
    @Inject('ProductDAO')
    private readonly productDAO: IProductDAO,
  ) {}

  async execute(input: FindByIdProductDto): Promise<ProductDto> {
    const { id } = input;
    const product = await this.productDAO.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const productDomain = ProductMapper.toDomain(product);
    return ProductMapper.toOutput(productDomain);
  }
}

export { FindByIdProductUseCase };
