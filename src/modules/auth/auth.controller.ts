import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_PATTERN } from './patterns';
import { LoginDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERN.LOGIN)
  login(@Payload() input: LoginDto) {
    return this.authService.login(input);
  }
}
