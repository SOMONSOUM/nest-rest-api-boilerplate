import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { TokenService } from './token.service';
import { HashService } from 'src/common/hash/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, TokenService, HashService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
