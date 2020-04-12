import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jwt } from './jwt.entity';
import { IJwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Jwt)
    private readonly jwtRepository: Repository<Jwt>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  async signIn(user: User): Promise<string> {
    const { id, username } = user;
    return await this.createToken({ sub: id, username });
  }

  async signOut(jti: string): Promise<void> {
    const jwt = await this.jwtRepository.findOne(jti);
    await this.jwtRepository.remove(jwt);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(username);
    if (!user) throw new UnauthorizedException();

    const isPasswordCorrect = await argon2.verify(user.password, password);
    if (!isPasswordCorrect) throw new UnauthorizedException();

    return user;
  }

  async validateToken(jti: string): Promise<void> {
    const jwt = await this.jwtRepository.findOne(jti);
    if (!jwt) throw new UnauthorizedException();

    const currentTime = this.getCurrentTime();
    if (currentTime > jwt.expTime) throw new UnauthorizedException();

    await this.updateToken(jwt);
  }

  private async createToken(payload: IJwtPayload): Promise<string> {
    const { sub, username } = payload;
    const expTime = this.getExpirationTime();
    const jwt = Jwt.create({ expTime });

    const { jti } = await this.jwtRepository.save(jwt);
    const token = this.jwtService.sign(
      { username },
      { subject: sub, jwtid: jti },
    );
    return token;
  }

  private async updateToken(jwt: Jwt): Promise<void> {
    const expTime = this.getExpirationTime();
    await this.jwtRepository.update({ jti: jwt.jti }, { expTime });
  }

  private getExpirationTime(): number {
    return this.getCurrentTime() + 600;
  }

  private getCurrentTime(): number {
    return Math.floor(Date.now() / 1000);
  }
}
