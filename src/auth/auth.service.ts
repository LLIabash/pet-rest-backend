import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userService.validateUserPassword(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Создание и возврат JWT токена
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
  
    return { accessToken }; // Возвращаем объект с полем accessToken
  }
}