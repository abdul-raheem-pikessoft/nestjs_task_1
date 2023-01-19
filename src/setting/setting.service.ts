import { Injectable, NotFoundException } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entities';
import { Like } from '../likes/entities/likes.entities';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {}
  async create(settingDto: SettingDto, user): Promise<any> {
    const userSetting = await this.settingRepository
      .createQueryBuilder()
      .select('settings')
      .from(Setting, 'settings')
      .where('settings.userId = :userId', {
        userId: user.id,
      })
      .getOne();
    if (userSetting) {
      return 'already user setting ceeated';
    }
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
