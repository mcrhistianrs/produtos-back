import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { MongoModule } from './shared/infra/database/mongo/mongo.module';
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV || ENV === 'production' ? '.env.prod' : `.env.${ENV}`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    MongoModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
