import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TRequestWithUser, TRequestWithJwt } from 'src/types/request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ id: string }> {
    const user = await this.authService.signUp(createUserDto);
    return { id: user.id };
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() request: TRequestWithUser): Promise<{ token: string }> {
    const { user } = request;
    return { token: await this.authService.signIn(user) };
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Req() request: TRequestWithJwt): void {
    const {
      user: { jti },
    } = request;
    this.authService.signOut(jti);
  }
}
