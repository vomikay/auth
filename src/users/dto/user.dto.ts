import { UserDataDto } from './user-data.dto';
import { IsInt } from 'class-validator';

export class UserDto extends UserDataDto {
  @IsInt()
  id: number;
}
