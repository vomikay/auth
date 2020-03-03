import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from 'src/users/dto/user-public-data.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registration(@Body() createUserDto: CreateUserDto): void {
    this.authService.regisration(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  login(@Request() { user }: { user: GetUserDto }): GetUserDto {
    return user;
  }
}
