import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IAuth } from './interfaces/auth.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GetUserDto } from 'src/users/dto/user-public-data.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registration(@Body() createUserDto: CreateUserDto): void {
    this.authService.regisration(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req: Express.Request): IAuth {
    const getUserDto = req.user as GetUserDto;
    return this.authService.login(getUserDto);
  }
}
