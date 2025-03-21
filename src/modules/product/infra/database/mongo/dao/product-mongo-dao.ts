import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BadRequestException } from '@nestjs/common';
import { UpdateProductDto } from 'src/modules/product/app/dto/update-product-dto';
import { ProductMapper } from 'src/modules/product/app/mapper/product-mapper';
import { Product } from 'src/modules/product/domain/entities/product';
import {
  FindAllFilter,
  IProductDAO,
  OrderFilter,
} from 'src/modules/product/domain/interface/interface-product';
import { ProductMongoDocument, ProductMongoModel } from '../schema/produto';

class ProductMongoDAO implements IProductDAO {
  constructor(
    @InjectModel(ProductMongoModel.name)
    private readonly productModel: Model<ProductMongoModel>,
  ) {}
  async create(input: Product): Promise<ProductMongoDocument> {
    try {
      const productData = ProductMapper.toDatabase(input);

      const { name, category, price, description, imageUrl, quantityInStock } =
        productData;

      const newProduct = new this.productModel({
        name,
        category,
        price,
        description,
        imageUrl,
        quantityInStock,
      });

      const productCreated = await newProduct.save();
      return productCreated;
    } catch {
      throw new BadRequestException('Error creating product');
    }
  }
  async findAll(
    filter?: FindAllFilter,
    order?: OrderFilter,
  ): Promise<ProductMongoDocument[]> {
    try {
      const query: any = {};

      if (filter) {
        if (filter.name) {
          query.name = { $regex: filter.name, $options: 'i' };
        }

        if (filter.priceFrom || filter.priceTo) {
          query.price = {};

          if (filter.priceFrom) {
            query.price.$gte = filter.priceFrom;
          }

          if (filter.priceTo) {
            query.price.$lte = filter.priceTo;
          }
        }
      }

      let findQuery = this.productModel.find(query);

      if (order) {
        if (order.field === 'name') {
          findQuery = findQuery.collation({ locale: 'en', strength: 2 });
        }
        const sortDirection = order.order === 'asc' ? 1 : -1;
        findQuery = findQuery.sort({ [order.field]: sortDirection });
      }

      const products = await findQuery;
      return products;
    } catch {
      throw new BadRequestException('Error finding products');
    }
  }
  async findById(id: string): Promise<ProductMongoDocument> {
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch {
      throw new BadRequestException('Error finding product');
    }
  }
  async update(input: UpdateProductDto): Promise<ProductMongoDocument> {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        input.id,
        input,
        {
          new: true,
        },
      );
      return product;
    } catch {
      throw new BadRequestException('Error updating product');
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.productModel.findByIdAndDelete(id);
    } catch {
      throw new BadRequestException('Error deleting product');
    }
  }
}

export { ProductMongoDAO };
