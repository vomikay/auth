import * as argon2 from 'argon2';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IUser } from './interfaces/user.interface';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}
