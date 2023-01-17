import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entities';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  index(): Promise<User[]> {
    return this.usersService.obtainAllData();
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.storeData(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.obtainData(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): string {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): any {
    return this.usersService.update(id, updateUserDto);
  }
}
