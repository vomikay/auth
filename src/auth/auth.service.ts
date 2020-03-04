import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { IAuth } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.usersService.findOne(username);

    if (user && argon2.verify(user.password, password)) {
      const { password, ...userData } = user; // eslint-disable-line
      return userData;
    }

    return null;
  }

  regisration(createUserDto: CreateUserDto): void {
    this.usersService.create(createUserDto);
  }

  login(getUserDto: UserDto): IAuth {
    const payload: ITokenPayload = { ...getUserDto };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
