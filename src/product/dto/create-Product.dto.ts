import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Название продукта', example: 'Умный телефон' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание продукта', example: 'Высококачественный смартфон с 8 ГБ оперативной памяти.' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Цена продукта', example: 599.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Список идентификаторов категорий', required: false, example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}