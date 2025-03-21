import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CategoryEnum } from '../../../../domain/entities/product';

export type ProductMongoDocument = ProductMongoModel & {
  _id: Types.ObjectId;
};

@Schema({ collection: 'products', timestamps: true })
class ProductMongoModel {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, enum: Object.values(CategoryEnum) })
  category: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: Number })
  quantityInStock: number;
}

const ProductMongoSchema = SchemaFactory.createForClass(ProductMongoModel);

export { ProductMongoModel, ProductMongoSchema };
