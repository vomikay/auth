import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ILoginResponse } from './interfaces/login-response.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from 'src/users/dto/user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registration(@Body() createUserDto: CreateUserDto): void {
    this.authService.regisration(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req: Express.Request): ILoginResponse {
    const getUserDto = req.user as UserDto;
    return this.authService.login(getUserDto);
  }
}
