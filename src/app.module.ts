import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { Order } from './order/order.entity';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Order, Category],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    WishlistModule,
  ],
})
export class AppModule {}