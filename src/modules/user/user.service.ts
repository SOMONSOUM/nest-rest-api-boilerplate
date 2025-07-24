import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto';
import { HashService } from 'src/common/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async create(params: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: params.email },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashService.hashString(params.password);
    params.password = hashedPassword;

    return this.userRepository.save(params);
  }
}
