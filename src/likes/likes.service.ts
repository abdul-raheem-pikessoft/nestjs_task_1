import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/likes.entities';
import { PostsService } from '../posts/posts.service';
import { User } from '../users/entities/users.entities';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    private postService: PostsService,
  ) {}
  async like(user, id): Promise<any> {
    const post = await this.postService.checkThePostExists(id);
    if (!post) {
      throw new NotFoundException();
    } else {
      const checkLike = await this.getLike(id, user);
      if (checkLike) {
        return 'You already like this post';
      }
      const like = this.likesRepository.create();
      like.user = user;
      like.post = post;
      this.likesRepository.save(like);
      this.postService.postLikeCount(id, true);
    }
    return 'Post is Liked';
  }

  async dislike(user, id): Promise<any> {
    const post = await this.postService.checkThePostExists(id);
    if (!post) {
      throw new NotFoundException();
    } else {
      const checkLike = await this.getLike(id, user);
      if (!checkLike) {
        return 'you need to like it first ';
      }
      this.likesRepository.delete(checkLike.id);
      this.postService.postLikeCount(id, false);
    }
    return 'Post is Disliked';
  }

  private async getLike(id, user) {
    return await this.likesRepository
      .createQueryBuilder()
      .select('likes')
      .from(Like, 'likes')
      .where('likes.postId = :postId AND likes.userId = :userId', {
        postId: id,
        userId: user.id,
      })
      .getOne();
  }
}
