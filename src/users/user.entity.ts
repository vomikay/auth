import * as argon2 from 'argon2';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  lastName: string;

  @IsEmail()
  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.username = this.username.trim();
    this.password = await argon2.hash(this.password.trim());
  }
}
