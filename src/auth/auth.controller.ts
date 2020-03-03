import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserData } from 'src/users/interfaces/user-data.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  registration(@Body() registrationDto: RegistrationDto): void {
    this.authService.regisration(registrationDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  login(@Request() { user }: { user: UserData }): UserData {
    return user;
  }
}
