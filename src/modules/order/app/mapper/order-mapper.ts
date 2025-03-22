import { Types } from 'mongoose';
import { Order } from '../../domain/entities/order';
import {
  OrderItemModel,
  OrderMongoDocument,
} from '../../infra/database/mongo/schema/order';
import { OrderDto } from '../dto/order-dto';
import { StatusEnum } from '../enums/status-enum';

class OrderMapper {
  static toOutput(order: Order): OrderDto {
    return {
      id: order.id,
      items: order.items,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  static toDomain(order: OrderMongoDocument): Order {
    return Order.create({
      _id: order._id.toString(),
      items: order.items.map((item) => ({
        productId: item.productId.toString(),
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      status: order.status as StatusEnum,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }

  static toDatabase(order: Order): OrderMongoDocument {
    const id = order.id ? new Types.ObjectId(order.id) : new Types.ObjectId();

    return {
      _id: id,
      items: order.items.map(
        (item) =>
          ({
            productId: new Types.ObjectId(item.productId),
            quantity: item.quantity,
            price: item.price,
          }) as OrderItemModel,
      ),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}

export { OrderMapper };
