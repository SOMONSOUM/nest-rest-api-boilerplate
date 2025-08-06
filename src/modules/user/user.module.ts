import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { HashService } from 'src/common/hash/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository, UserService, HashService],
  exports: [UserRepository, UserService, HashService],
})
export class UserModule {}
