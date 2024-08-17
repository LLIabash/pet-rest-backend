import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async createReview(createReviewDto: CreateReviewDto, productId: number, user: User): Promise<Review> {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    // Проверяем, существует ли уже отзыв этого пользователя для данного продукта
    const existingReview = await this.reviewRepository.findOne({ where: { product, user } });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this product.');
    }

    // Создаем новый отзыв
    const review = this.reviewRepository.create({
      ...createReviewDto,
      product,
      user,
    });

    return await this.reviewRepository.save(review);
  }

  async deleteReview(reviewId: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['product'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: review.product.id },
      relations: ['reviews'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.reviews.length > 1) {
      const remainingRatings = product.reviews
        .filter(r => r.id !== reviewId)
        .map(r => r.rating);

      const newAverageRating = remainingRatings.reduce((a, b) => a + b, 0) / remainingRatings.length;
      product.averageRating = newAverageRating;
      await this.productRepository.save(product);
    } else {
      // Если это был единственный отзыв, установим средний рейтинг в 0
      product.averageRating = 0;
      await this.productRepository.save(product);
    }

    await this.reviewRepository.delete(reviewId);
  }

  async appendOrUpdateReview(
    productId: number,
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<Review> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['reviews'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = await this.reviewRepository.findOne({
      where: { product, user },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    // Обновить дополнение и/или рейтинг, если они уже существуют
    review.appendedComment = createReviewDto.comment || review.appendedComment;
    review.rating = createReviewDto.rating || review.rating;

    await this.reviewRepository.save(review);

    // Пересчет среднего рейтинга продукта
    const ratings = product.reviews.map((r) =>
      r.id === review.id ? review.rating : r.rating,
    );
    product.averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    await this.productRepository.save(product);

    return review;
  }

  async findReviewsByProductId(productId: number): Promise<Review[]> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['reviews', 'reviews.user'], // Загружаем связи с отзывами и пользователями
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product.reviews;
  }
}