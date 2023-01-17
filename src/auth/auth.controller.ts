import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { SigninDto } from './dto/signin.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Post('signin')
  signIn(@Body() signinDto: SigninDto): any {
    return this.authService.login(signinDto);
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): any {
    return this.usersService.storeData(createUserDto);
  }
}
