import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
