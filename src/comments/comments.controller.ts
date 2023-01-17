import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Post(':id')
  create(
    @Body() createCommentDto: CommentDto,
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.commentsService.comment(createCommentDto, id, req.user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.commentsService.uncomment(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: CommentDto,
  ): any {
    return this.commentsService.update(id, updateCommentDto);
  }
}
