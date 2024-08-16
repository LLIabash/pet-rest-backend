import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email пользователя', example: 'user@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'strongpassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}