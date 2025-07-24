import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_PATTERN } from './patterns';
import { CreateUserDto } from './dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(USER_PATTERN.FIND_ALL)
  getUsers() {
    return this.userService.findAll();
  }

  @MessagePattern(USER_PATTERN.CREATE)
  createUser(@Payload() input: CreateUserDto) {
    return this.userService.create(input);
  }
}
