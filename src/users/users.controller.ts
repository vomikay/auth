import { Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(): void {
    console.log();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateUser(): void {
    console.log();
  }
}
