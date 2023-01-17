import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}
