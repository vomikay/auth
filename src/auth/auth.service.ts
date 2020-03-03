import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { UserData } from 'src/users/interfaces/user-data.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  regisration(registrationDto: RegistrationDto): void {
    this.usersService.create(registrationDto);
  }

  async login(loginDto: LoginDto): Promise<UserData | null> {
    const { username, password } = loginDto;
    const user = await this.usersService.findOne(username);

    if (user && argon2.verify(user.password, password)) {
      const { password, ...userData } = user; // eslint-disable-line
      return userData;
    }

    return null;
  }
}
