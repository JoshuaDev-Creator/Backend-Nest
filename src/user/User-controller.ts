import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/User-service';
import { User } from './entitity/User-entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }
}
