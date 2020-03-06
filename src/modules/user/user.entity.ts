import {
  Entity, Column, PrimaryGeneratedColumn, BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { TRoles } from '../../type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
  }

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: TRoles;

  async comparePassword(attempt: string): Promise<boolean> {
    console.log('WE Inside entity');

    return bcrypt.compare(attempt, this.password);
  }
}
