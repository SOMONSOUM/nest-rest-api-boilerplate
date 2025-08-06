import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './dto';
import { HashService } from 'src/common/hash/hash.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async login(params: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: params.email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.hashService.compareHash(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.tokenService.generateTokenPair({
      userId: user.id,
    });

    return tokens;
  }
}
