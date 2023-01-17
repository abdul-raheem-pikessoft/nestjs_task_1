import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  comment: string;
}
