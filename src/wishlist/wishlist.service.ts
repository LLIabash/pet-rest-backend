import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToWishlist(userId: number, productId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    user.wishlist.push(product);
    await this.userRepository.save(user);
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    user.wishlist = user.wishlist.filter(product => product.id !== productId);
    await this.userRepository.save(user);
  }

  async getWishlist(userId: number): Promise<Product[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user.wishlist;
  }
}