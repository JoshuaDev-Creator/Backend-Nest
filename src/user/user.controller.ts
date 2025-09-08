import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }
}
