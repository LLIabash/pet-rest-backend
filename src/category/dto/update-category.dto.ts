import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: 'Название категории', required: false, example: 'Электроника' })
  @IsOptional()
  @IsString()
  name?: string;
}