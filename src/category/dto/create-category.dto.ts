import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название категории', example: 'Электроника' })
  @IsString()
  name: string;
}