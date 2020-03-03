import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GetUserDto } from 'src/users/dto/user-public-data.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  regisration(createUserDto: CreateUserDto): void {
    this.usersService.create(createUserDto);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<GetUserDto | null> {
    const user = await this.usersService.findOne(username);

    if (user && argon2.verify(user.password, password)) {
      const { password, ...userData } = user; // eslint-disable-line
      return userData;
    }

    return null;
  }
}
