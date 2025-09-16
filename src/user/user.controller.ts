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
  async create(@Body() userData: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    try {
      return await this.userService.update(id, userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAll(): Promise<User[]> {
    try {
      return await this.userService.getAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/recent')
  async getRecent(): Promise<User[]> {
    return this.userService.getRecent();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<any> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userService.delete(id);
  }
}
