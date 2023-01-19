import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('pbkdf2');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async obtainAllData(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async storeData(createUserDto: CreateUserDto): Promise<any> {
    if (!(await this.checkUserEmailExists(createUserDto.email))) {
      const newUser = this.usersRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: this.hashingPassword(createUserDto.password),
      });
      return this.usersRepository.save(newUser);
    }
    return { error: 'Email already exists' };
  }

  private async checkUserEmailExists(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email: email },
    });
  }

  private async checkUserEmailExistsInUpdate(
    email: string,
    id: number,
  ): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder()
      .select('users')
      .from(User, 'users')
      .where('users.email = :email AND users.id != :id', {
        email: email,
        id: id,
      })
      .getOne();
  }

  async obtainData(id: number): Promise<any> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  private getUserById(id: number) {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  hashingPassword(password): string {
    return crypto.pbkdf2Sync(password, 'salt', 1, 32, 'md5').toString('hex');
  }

  remove(id): any {
    this.usersRepository.delete(id);
    return { message: 'User is deleted!' };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    if (!(await this.checkUserEmailExistsInUpdate(updateUserDto.email, id))) {
      this.usersRepository.update(
        { id },
        {
          ...updateUserDto,
          password: updateUserDto.password
            ? this.hashingPassword(updateUserDto.password)
            : undefined,
        },
      );
      return { message: 'User is updated!' };
    }
    return { error: 'Email already exists' };
  }
}
