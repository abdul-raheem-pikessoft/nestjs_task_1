import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Like')
@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}
  @Post(':id')
  create(@Param('id', ParseIntPipe) id: number, @Req() req): any {
    return this.likesService.like(req.user, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req): any {
    return this.likesService.dislike(req.user, id);
  }
}
