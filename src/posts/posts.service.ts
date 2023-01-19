import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/posts.entities';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}
  store(createPostDto: CreatePostDto, user): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
    });
    post.user = user;
    return this.postsRepository.save(post);
  }

  finalAll(take, skip): Promise<Post[]> {
    return this.postsRepository
      .createQueryBuilder('posts')
      .orderBy('id')
      .take(take)
      .skip(skip)
      .getMany();
  }

  async find(id): Promise<Post> {
    const post = await this.checkThePostExists(id);
    if (!post) {
      throw new NotFoundException();
    } else {
      return post;
    }
  }

  delete(id): any {
    this.postsRepository.delete(id);
    return 'Post is deleted';
  }

  async update(id, updatePostDto: UpdatePostDto): Promise<any> {
    const post = await this.checkThePostExists(id);
    if (!post) {
      throw new NotFoundException();
    } else {
      this.postsRepository.update(
        {
          id,
        },
        {
          title: updatePostDto.title,
          description: updatePostDto.description,
        },
      );
      return { message: 'Post is updated' };
    }
  }

  checkThePostExists(id) {
    return this.postsRepository.findOne({
      where: { id: id },
    });
  }

  async postLikeCount(id, likeOrDislike): Promise<any> {
    const post = await this.checkThePostExists(id);
    let likeCount = 0;
    if (likeOrDislike) {
      likeCount = ++post.likesCount;
    } else {
      if (post.likesCount > 0) {
        likeCount = --post.likesCount;
      }
    }
    if (!post) {
      throw new NotFoundException();
    } else {
      this.postsRepository.update(
        {
          id,
        },
        {
          likesCount: likeCount,
        },
      );
    }
    return { message: 'Done' };
  }

  async postCommentCount(id, commentOrUncomment): Promise<any> {
    const post = await this.checkThePostExists(id);
    let commentsCount = 0;
    if (commentOrUncomment) {
      commentsCount = ++post.commentsCount;
    } else {
      if (post.commentsCount > 0) {
        commentsCount = --post.commentsCount;
      }
    }
    if (!post) {
      throw new NotFoundException();
    } else {
      this.postsRepository.update(
        {
          id,
        },
        {
          commentsCount: commentsCount,
        },
      );
    }
    return { message: 'Done' };
  }
}
