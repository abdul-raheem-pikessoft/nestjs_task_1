import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.password === this.userService.hashingPassword(password)) {
      return user;
    }
    return null;
  }

  async login(signinDto: SigninDto): Promise<any> {
    const user = await this.validateUser(signinDto.email, signinDto.password);
    if (!user) {
      throw new UnauthorizedException({
        message: 'email or password is invalid',
      });
    }
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
