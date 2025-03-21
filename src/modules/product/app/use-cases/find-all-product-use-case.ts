import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product';
import {
  FindAllFilter,
  IProductDAO,
  OrderFilter,
} from '../../domain/interface/interface-product';
import { FindAllDto } from '../dto/find-all-dto';
import { ProductMapper } from '../mapper/product-mapper';

@Injectable()
class FindAllProductUseCase {
  constructor(
    @Inject('ProductDAO')
    private readonly productDao: IProductDAO,
  ) {}

  async execute(input: FindAllDto): Promise<Product[]> {
    const filter: FindAllFilter = {
      name: input.name,
      priceFrom: input.priceFrom,
      priceTo: input.priceTo,
    };

    const order: OrderFilter = input.orderField
      ? {
          field: input.orderField,
          order:
            input.orderDirection === 'asc' || input.orderDirection === 'desc'
              ? input.orderDirection
              : 'asc',
        }
      : undefined;

    const products = await this.productDao.findAll(filter, order);
    return products.map((product) => ProductMapper.toDomain(product));
  }
}

export { FindAllProductUseCase };
