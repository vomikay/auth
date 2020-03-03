import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  regisration(registrationDto: RegistrationDto): void {
    this.usersService.create(registrationDto);
  }
}
