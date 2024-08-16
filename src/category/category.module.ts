import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Product } from '../product/product.entity';  // Импортируем сущность Product

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}