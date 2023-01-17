import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from './src/users/entities/users.entities';
import { Post } from './src/posts/entities/posts.entities';
import { Like } from './src/likes/entities/likes.entities';
import { Comment } from './src/comments/entities/comments.entities';
import { Setting } from './src/setting/entities/setting.entities';

const MySQLConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test1',
  entities: [User, Post, Like, Comment, Setting],
  synchronize: true,
};
export default MySQLConfig;
