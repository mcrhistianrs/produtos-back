import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateProductUseCase } from './app/use-cases/create-product-use-case';
import { FindAllProductUseCase } from './app/use-cases/find-all-product-use-case';
import { ProductMongoDAO } from './infra/database/mongo/dao/product-mongo-dao';
import {
  ProductMongoModel,
  ProductMongoSchema,
} from './infra/database/mongo/schema/produto';
import { ProductController } from './product.controller';

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
      { name: ProductMongoModel.name, schema: ProductMongoSchema },
    ]),
  ],
  providers: [
    {
      provide: 'ProductDAO',
      useClass: ProductMongoDAO,
    },
    CreateProductUseCase,
    FindAllProductUseCase,
  ],
  controllers: [ProductController],
  exports: [CreateProductUseCase],
})
export class ProductModule {}
