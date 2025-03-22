import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { StatusEnum } from '../../../../app/enums/status-enum';

export type OrderMongoDocument = OrderMongoModel & {
  _id: Types.ObjectId;
};

@Schema({ _id: false })
class OrderItemModel {
  @Prop({ required: true, type: Types.ObjectId, ref: 'ProductMongoModel' })
  productId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  price: number;
}

@Schema({ collection: 'orders', timestamps: true })
class OrderMongoModel {
  @Prop({ required: true, type: [OrderItemModel] })
  items: OrderItemModel[];

  @Prop({ required: true, type: Number })
  total: number;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.PENDING,
  })
  status: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true, type: Date })
  updatedAt: Date;
}

const OrderMongoSchema = SchemaFactory.createForClass(OrderMongoModel);

export { OrderItemModel, OrderMongoModel, OrderMongoSchema };
