import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
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
  createUser(data: CreateUserDto) {
    return this.userService.create(data);
  }
}
