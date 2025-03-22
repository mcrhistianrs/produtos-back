import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IProductDAO } from '../../domain/interface/interface-product';

@Injectable()
class DeleteProductUseCase {
  constructor(
    @Inject('ProductDAO')
    private readonly productDAO: IProductDAO,
  ) {}

  async execute(id: string): Promise<void> {
    const productExists = await this.productDAO.findById(id);

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    await this.productDAO.delete(id);
  }
}

export { DeleteProductUseCase };
