import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductMongoModel,
  ProductMongoSchema,
} from '../product/infra/database/mongo/schema/produto';
import { OrderMongoRepository } from './infra/database/mongo/repository/order-mongo-repository';
import {
  OrderMongoModel,
  OrderMongoSchema,
} from './infra/database/mongo/schema/order';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from './use-cases/create-order-use-case';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: OrderMongoModel.name, schema: OrderMongoSchema },
      { name: ProductMongoModel.name, schema: ProductMongoSchema },
    ]),
  ],
  providers: [
    {
      provide: 'OrderRepository',
      useClass: OrderMongoRepository,
    },
    CreateOrderUseCase,
  ],
  controllers: [OrderController],
  exports: [CreateOrderUseCase],
})
export class OrderModule {}
