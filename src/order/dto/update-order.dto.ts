import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'Список идентификаторов продуктов в заказе',
    type: [Number],
    required: false,
    example: [1, 2, 3]
  })
  @IsArray()
  @IsOptional()
  products?: number[];

  @ApiProperty({ description: 'Общая стоимость заказа', required: false, example: 299.99 })
  @IsNumber()
  @IsOptional()
  total?: number;

  @ApiProperty({ description: 'Статус заказа', required: false, example: 'shipped' })
  @IsString()
  @IsOptional()
  status?: string;
}