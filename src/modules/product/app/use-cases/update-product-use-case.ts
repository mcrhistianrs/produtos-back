import { Inject, Injectable } from '@nestjs/common';

import { IProductDAO } from '../../domain/interface/interface-product';
import { ProductDto } from '../dto/product-dto';
import { UpdateProductDto } from '../dto/update-product-dto';
import { ProductMapper } from '../mapper/product-mapper';

@Injectable()
class UpdateProductUseCase {
  constructor(
    @Inject('ProductDAO')
    private readonly productDAO: IProductDAO,
  ) {}

  async execute(input: UpdateProductDto): Promise<ProductDto> {
    const productExists = await this.productDAO.findById(input.id);

    if (!productExists) {
      throw new Error('Product not found');
    }

    const updatedProductDatabase = await this.productDAO.update(input);
    const productDomain = ProductMapper.toDomain(updatedProductDatabase);
    return ProductMapper.toOutput(productDomain);
  }
}

export { UpdateProductUseCase };
