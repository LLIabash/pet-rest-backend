import { Controller, Post, Delete, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('wishlist')
@UseGuards(AuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @ApiOperation({ summary: 'Добавить товар в список желаемого' })
  @ApiParam({ name: 'productId', type: 'number', description: 'Идентификатор товара' })
  @Post(':productId')
  async addToWishlist(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<void> {
    return this.wishlistService.addToWishlist(user.id, productId);
  }

  @Delete(':productId')
  async removeFromWishlist(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<void> {
    return this.wishlistService.removeFromWishlist(user.id, productId);
  }

  @Get()
  async getWishlist(@GetUser() user: User) {
    return this.wishlistService.getWishlist(user.id);
  }
}