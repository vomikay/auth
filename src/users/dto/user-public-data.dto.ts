import { UserDataDto } from './user-data.dto';
import { IsInt } from 'class-validator';

export class GetUserDto extends UserDataDto {
  @IsInt()
  id: number;
}
