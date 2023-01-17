import { Injectable, NotFoundException } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entities';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {}
  create(settingDto: SettingDto, user): any {
    const setting = this.settingRepository.create({
      notification: settingDto.notification,
    });
    setting.user = user;
    return this.settingRepository.save(setting);
  }

  async show(id): Promise<any> {
    const setting = await this.settingRepository.findOne({ where: { id: id } });
    if (!setting) {
      throw new NotFoundException();
    }
    return setting;
  }

  delete(id): any {
    this.settingRepository.delete(id);
    return 'User setting is deleted';
  }

  update(id, settingDto: SettingDto) {
    this.settingRepository.update(
      { id },
      {
        notification: settingDto.notification,
      },
    );
    return 'update the user setting';
  }
}
