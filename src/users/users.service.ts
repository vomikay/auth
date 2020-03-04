import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    return this.usersRepository.save(user);
  }

  findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateOne(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    const user = await this.findOne(username);
    if (!user) return false;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    const result = await this.usersRepository.update({ username }, user);
    return !!result;
  }
}
