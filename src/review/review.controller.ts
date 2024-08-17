import { Controller, Post, Body, Param, UseGuards, Delete, Get, BadRequestException, Patch } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './review.entity';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post('product/:productId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создание отзыва для продукта' })
  @ApiResponse({ status: 201, type: Review, description: 'The newly created review' })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async createReview(
    @Param('productId') productId: string,
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ) {
    const id = parseInt(productId, 10);

    if (isNaN(id)) {
      throw new BadRequestException(`Invalid product ID: ${productId}`);
    }

    return this.reviewService.createReview(createReviewDto, id, user);
  }

  @Delete(':reviewId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление отзыва' }) // Update summary for clarity
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async deleteReview(@Param('reviewId') reviewId: number): Promise<void> {
    await this.reviewService.deleteReview(reviewId);
  }

  @Post('append/:productId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Добавление или изменение дополнения отзыва к продукту' })
  @ApiResponse({ status: 201, type: Review, description: 'The newly appended or updated review' })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product or Review not found' })
  async appendOrUpdateReview(
    @Param('productId') productId: number,
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ): Promise<Review> {
    return this.reviewService.appendOrUpdateReview(productId, createReviewDto, user);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Получение всех отзывов для продукта' })
  @ApiResponse({ status: 200, type: [Review], description: 'Список отзывов' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findReviewsByProductId(@Param('productId') productId: number): Promise<Review[]> {
    return this.reviewService.findReviewsByProductId(productId);
  }
}