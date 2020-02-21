import { IUserData } from './user-data.interface';

export interface IUser extends IUserData {
  password: string;
}
