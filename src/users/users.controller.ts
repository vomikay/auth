import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserData(@Request() { user }: { user: UserDto }): Promise<UserDto> {
    // eslint-disable-next-line
    const { password, ...userData } = await this.usersService.findOne(
      user.username,
    );
    return userData;
  }
}
