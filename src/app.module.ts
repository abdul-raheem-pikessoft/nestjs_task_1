import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NoAuth } from './auth/no-auth.guard';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { SettingModule } from './setting/setting.module';
import MySQLConfig from '../ormMySQLConfig';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(MySQLConfig),
    AuthModule,
    PostsModule,
    LikesModule,
    CommentsModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
