import { IsInt, IsString, Min, Max, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ description: 'Оценка для продукта (1-5)', required: true })
  rating: number;

  @IsString()
  @ApiProperty({ description: 'Комментарий о продукте', required: true })
  comment: string;
}