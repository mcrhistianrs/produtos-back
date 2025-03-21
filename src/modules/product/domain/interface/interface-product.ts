import { UpdateProductDto } from '../../app/dto/update-product-dto';
import { ProductMongoDocument } from '../../infra/database/mongo/schema/produto';
import { Product } from '../entities/product';

interface FindAllFilter {
  name?: string;
  priceFrom?: number;
  priceTo?: number;
}

interface OrderFilter {
  field: string;
  order: 'asc' | 'desc';
}

interface IProductDAO {
  create(input: Product): Promise<ProductMongoDocument>;
  findAll(
    filter?: FindAllFilter,
    order?: OrderFilter,
  ): Promise<ProductMongoDocument[]>;
  findById(id: string): Promise<ProductMongoDocument>;
  update(input: UpdateProductDto): Promise<ProductMongoDocument>;
  delete(id: string): Promise<void>;
}

export { FindAllFilter, IProductDAO, OrderFilter };
