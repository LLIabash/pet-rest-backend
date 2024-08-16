import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}