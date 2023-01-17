import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { PostsService } from '../posts/posts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comments.entities';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private postService: PostsService,
  ) {}
  async comment(createCommentDto: CommentDto, id, user): Promise<any> {
    const post = await this.postService.checkThePostExists(id);
    if (!post) {
      throw new BadRequestException();
    } else {
      const comment = this.commentRepository.create({
        comment: createCommentDto.comment,
      });
      comment.user = user;
      comment.post = post;
      this.commentRepository.save(comment);
      this.postService.postCommentCount(id, true);
    }
    return 'Commented on the post';
  }

  async uncomment(id): Promise<any> {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    if (comment) {
      this.commentRepository.delete(id);
      this.postService.postCommentCount(comment.post.id, false);
      return 'Comment deleted!';
    }
  }

  async update(id, updateCommentDto: CommentDto): Promise<any> {
    this.commentRepository.update(
      { id },
      {
        comment: updateCommentDto.comment,
      },
    );
    return 'update the comment';
  }
}
