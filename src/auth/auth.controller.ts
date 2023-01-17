import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
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
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): any {
    return this.usersService.storeData(createUserDto);
  }
}
