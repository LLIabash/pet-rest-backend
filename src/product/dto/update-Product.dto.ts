import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-Product.dto';
import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'Название продукта', required: false, example: 'Умный телефон' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Описание продукта', required: false, example: 'Высококачественный смартфон с 8 ГБ оперативной памяти.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Цена продукта', required: false, example: 599.99 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ description: 'Список идентификаторов категорий', required: false, example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}