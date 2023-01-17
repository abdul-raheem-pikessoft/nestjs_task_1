import { User } from './src/users/entities/users.entities';
import { Post } from './src/posts/entities/posts.entities';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'abdul',
  entities: [User, Post],
  synchronize: true,
};

export default config;
