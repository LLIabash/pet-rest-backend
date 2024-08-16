import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email пользователя для входа', example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя для входа', example: 'strongpassword123' })
  @IsString()
  password: string;
}