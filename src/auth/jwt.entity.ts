import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Jwt {
  @PrimaryGeneratedColumn('uuid')
  jti: string;

  @Column()
  expTime: number;

  static create(object: { jti?: string; expTime: number }): Jwt {
    const { jti, expTime } = object;
    const jwt = new Jwt();
    jwt.jti = jti;
    jwt.expTime = expTime;
    return jwt;
  }
}
