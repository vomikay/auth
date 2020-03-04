import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('info')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserData(@Request() req: Express.Request): Promise<UserDto> {
    const jwt = req.user as IJwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = await this.usersService.findOne(
      jwt.username,
    );
    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUserData(
    @Request() req: Express.Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const jwt = req.user as IJwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await this.usersService.updateOne(jwt.username, updateUserDto);
  }
}
