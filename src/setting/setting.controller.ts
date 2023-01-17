import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingDto } from './dto/setting.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Setting')
@UseGuards(JwtAuthGuard)
@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}
  @Post()
  create(@Body() settingDto: SettingDto, @Req() req): any {
    return this.settingService.create(settingDto, req.user);
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): any {
    return this.settingService.show(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.settingService.delete(id);
  }

  @Patch(':id')
  update(
    @Body() settingDto: SettingDto,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.settingService.update(id, settingDto);
  }
}
