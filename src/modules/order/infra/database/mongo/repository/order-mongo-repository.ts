import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StatusEnum } from 'src/modules/order/app/enums/status-enum';
import { OrderMapper } from 'src/modules/order/app/mapper/order-mapper';
import { Order } from 'src/modules/order/domain/entities/order';

import { IOrderRepository } from 'src/modules/order/domain/inteface/interface-repository';
import { ProductMongoModel } from 'src/modules/product/infra/database/mongo/schema/produto';
import { OrderMongoModel } from '../schema/order';

@Injectable()
class OrderMongoRepository implements IOrderRepository {
  constructor(
    @InjectModel(OrderMongoModel.name)
    private readonly orderModel: Model<OrderMongoModel>,
    @InjectModel(ProductMongoModel.name)
    private readonly productModel: Model<ProductMongoModel>,
  ) {}

  async create(order: Order): Promise<Order> {
    try {
      for (const item of order.items) {
        const product = await this.productModel.findById(item.productId);

        if (!product) {
          throw new NotFoundException(
            `Product with ID ${item.productId} not found`,
          );
        }

        if (product.quantityInStock < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.name}. Available: ${product.quantityInStock}, Requested: ${item.quantity}`,
          );
        }
      }

      const orderData = OrderMapper.toDatabase(order);
      const newOrder = new this.orderModel(orderData);
      const savedOrder = await newOrder.save();
      return OrderMapper.toDomain(savedOrder);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Error creating order');
    }
  }

  async findAll(filter?: any): Promise<Order[]> {
    try {
      let query = this.orderModel.find(filter || {});
      query = query.populate('items.productId');

      const orders = await query.exec();
      return orders.map((order) => OrderMapper.toDomain(order));
    } catch {
      throw new BadRequestException('Error finding orders');
    }
  }

  async findById(id: string): Promise<Order> {
    try {
      const order = await this.orderModel
        .findById(id)
        .populate('items.productId');

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return OrderMapper.toDomain(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error finding order');
    }
  }

  async update(id: string, orderData: Order): Promise<Order> {
    try {
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      const updatedOrderData = OrderMapper.toDatabase(orderData);
      const updatedOrder = await this.orderModel
        .findByIdAndUpdate(id, updatedOrderData, { new: true })
        .populate('items.productId');

      return OrderMapper.toDomain(updatedOrder);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating order');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      await this.orderModel.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error deleting order');
    }
  }

  async updateStatus(id: string, status: StatusEnum): Promise<Order> {
    try {
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      if (
        status === StatusEnum.CONCLUDED &&
        order.status !== StatusEnum.CONCLUDED
      ) {
        const session = await this.orderModel.db.startSession();

        try {
          session.startTransaction();

          for (const item of order.items) {
            const product = await this.productModel.findById(item.productId);

            if (!product) {
              throw new NotFoundException(
                `Product with ID ${item.productId} not found`,
              );
            }

            if (product.quantityInStock < item.quantity) {
              throw new BadRequestException(
                `Cannot complete order: Insufficient stock for product ${product.name}.`,
              );
            }

            await this.productModel.findByIdAndUpdate(
              item.productId,
              { $inc: { quantityInStock: -item.quantity } },
              { session },
            );
          }

          order.status = status;
          await order.save({ session });

          await session.commitTransaction();
        } catch (error) {
          await session.abortTransaction();
          throw error;
        } finally {
          session.endSession();
        }

        return OrderMapper.toDomain(order);
      }

      order.status = status;
      const savedOrder = await order.save();
      return OrderMapper.toDomain(savedOrder);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Error updating order status');
    }
  }
}

export { OrderMongoRepository };
