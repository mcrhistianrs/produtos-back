import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BadRequestException } from '@nestjs/common';
import { UpdateProductDto } from 'src/modules/product/app/dto/update-product-dto';
import { ProductMapper } from 'src/modules/product/app/mapper/product-mapper';
import { Product } from 'src/modules/product/domain/entities/product';
import { IProductDAO } from 'src/modules/product/domain/interface/interface-product';
import { ProductMongoDocument, ProductMongoModel } from '../schema/produto';

class ProductMongoDAO implements IProductDAO {
  constructor(
    @InjectModel(ProductMongoModel.name)
    private readonly productModel: Model<ProductMongoModel>,
  ) {}
  async create(input: Product): Promise<ProductMongoDocument> {
    try {
      const productData = ProductMapper.toDatabase(input);

      const { name, category, price, description, imageUrl } = productData;

      const newProduct = new this.productModel({
        name,
        category,
        price,
        description,
        imageUrl,
      });

      const productCreated = await newProduct.save();
      return productCreated;
    } catch {
      throw new BadRequestException('Error creating product');
    }
  }
  async findAll(): Promise<ProductMongoDocument[]> {
    try {
      const products = await this.productModel.find();
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
