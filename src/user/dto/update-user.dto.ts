import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'Email пользователя', required: false, example: 'user@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Имя пользователя', required: false, example: 'john_doe' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Пароль пользователя', required: false, example: 'newpassword123' })
  @IsOptional()
  @IsString()
  password?: string;
}