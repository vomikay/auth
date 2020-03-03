import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registration(@Body() registrationDto: RegistrationDto): void {
    this.authService.regisration(registrationDto);
  }
}
