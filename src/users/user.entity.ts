import * as argon2 from 'argon2';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @IsEmail()
  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  static create(object: {
    id?: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }): User {
    const { id, username, password, firstName, lastName, email } = object;
    const user = new User();
    user.id = id;
    user.username = username;
    user.password = password;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
