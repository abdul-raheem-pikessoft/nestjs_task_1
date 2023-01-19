import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post(':id')
  create(
    @Body() createCommentDto: CommentDto,
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    try {
      return this.commentsService.comment(createCommentDto, id, req.user);
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
  delete(@Param('id', ParseIntPipe) id: number): any {
    try {
      return this.commentsService.uncomment(id);
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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: CommentDto,
  ): any {
    try {
      return this.commentsService.update(id, updateCommentDto);
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
