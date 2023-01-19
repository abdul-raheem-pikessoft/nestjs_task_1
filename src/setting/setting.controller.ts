import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingDto } from './dto/setting.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Setting')
@ApiBearerAuth()
@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}
  @Post()
  create(@Body() settingDto: SettingDto, @Req() req): any {
    try {
      return this.settingService.create(settingDto, req.user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): any {
    try {
      return this.settingService.show(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    try {
      return this.settingService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Patch(':id')
  update(
    @Body() settingDto: SettingDto,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    try {
      return this.settingService.update(id, settingDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
