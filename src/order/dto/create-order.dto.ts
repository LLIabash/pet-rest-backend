import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Product } from 'src/product/product.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Список продуктов в заказе',
    type: [Number],
    example: [1, 2, 3]
  })
  @IsArray()
  @ArrayNotEmpty()
  products: number[];

  @ApiProperty({ description: 'Общая стоимость заказа', example: 299.99 })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Статус заказа', example: 'pending' })
  @IsString()
  status: string;
}