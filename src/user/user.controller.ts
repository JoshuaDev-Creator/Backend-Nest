import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    try {
      return await this.userService.createUser(userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/allUsers')
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/recentUsers')
  async getRecentUsers(): Promise<User[]> {
    return this.userService.GetRecentUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number): Promise<any> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userService.deleteUserById(id);
  }

  @Put('updateUser/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    try {
      return await this.userService.UpdateUser(id, userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
