import { IsNotEmpty, IsString } from 'class-validator';

export class UserDataDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
