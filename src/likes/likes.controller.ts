import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Like')
@ApiBearerAuth()
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post(':id')
  create(@Param('id', ParseIntPipe) id: number, @Req() req): any {
    try {
      return this.likesService.like(req.user, id);
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
  delete(@Param('id', ParseIntPipe) id: number, @Req() req): any {
    try {
      return this.likesService.dislike(req.user, id);
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
