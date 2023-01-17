import { User } from './src/users/entities/users.entities';
import { Post } from './src/posts/entities/posts.entities';
import { Like } from './src/likes/entities/likes.entities';
import { Comment } from './src/comments/entities/comments.entities';
import { Setting } from './src/setting/entities/setting.entities';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'abdul',
  entities: [User, Post, Like, Comment, Setting],
  synchronize: true,
};

export default config;
