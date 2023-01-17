import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SettingDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  notification: string;
}
