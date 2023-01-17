import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Post')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req): any {
    return this.postService.store(createPostDto, req.user);
  }
  @Get('/:take/:skip')
  index(
    @Param('take', ParseIntPipe) take: number,
    @Param('skip', ParseIntPipe) skip: number,
  ): Promise<any> {
    return this.postService.finalAll(take, skip);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.postService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): any {
    return this.postService.update(id, updatePostDto);
  }
}
