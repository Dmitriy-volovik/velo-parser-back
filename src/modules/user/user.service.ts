import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dto/signUp.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}


  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(id: string | number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  public findByEmail(userEmail: string): Promise<User> {
    return this.usersRepository.findOne({ email: userEmail });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: SignUpDto): Promise<any> {
    return this.usersRepository.save(user);
  }

  public async register(userDto: SignUpDto): Promise<any> {
    const { email } = userDto;
    let user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }
}
