import { UserDataDto } from './user-data.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends UserDataDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
