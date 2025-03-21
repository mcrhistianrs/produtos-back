import { Types } from 'mongoose';
import { CategoryEnum, Product } from '../../domain/entities/product';
import { ProductMongoDocument } from '../../infra/database/mongo/schema/produto';
import { ProductDto } from '../dto/product-dto';

class ProductMapper {
  static toOutput(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      category: product.category as CategoryEnum,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      quantityInStock: product.quantityInStock,
    };
  }

  static toDomain(product: ProductMongoDocument): Product {
    return Product.create({
      _id: product._id.toString(),
      name: product.name,
      category: product.category as CategoryEnum,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      quantityInStock: product.quantityInStock,
    });
  }

  static toDatabase(product: Product): ProductMongoDocument {
    const id = product.id
      ? new Types.ObjectId(product.id)
      : new Types.ObjectId();
    return {
      _id: id,
      name: product.name,
      category: product.category as CategoryEnum,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      quantityInStock: product.quantityInStock,
    };
  }
}

export { ProductMapper };
