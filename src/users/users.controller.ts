import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/user-public-data.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserData(
    @Request() { user }: { user: GetUserDto },
  ): Promise<GetUserDto> {
    // eslint-disable-next-line
    const { password, ...userData } = await this.usersService.findOne(
      user.username,
    );
    return userData;
  }
}
