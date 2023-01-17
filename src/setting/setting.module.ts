import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
