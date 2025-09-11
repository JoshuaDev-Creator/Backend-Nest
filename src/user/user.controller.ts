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
import { Project } from 'src/project/entities/project.entity';

@Controller('users')
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

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    const user = await this.userService.getOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userService.deleteUser(id);
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number): Promise<any> {
    const user = await this.userService.getOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userService.getOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    try {
      return await this.userService.UpdateUser(id, userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getRecentUsers(): Promise<User[]> {
    return this.userService.GetRecentUsers();
  }

  @Get(':id/projects')
  async getProjectsOfUser(@Param('id') id: number): Promise<Project[]> {
    const projects = await this.userService.getCorrespondingUserProjects(id);
    if (!projects || projects.length === 0) {
      throw new NotFoundException(`No projects found for user ID ${id}`);
    }
    return projects;
  }
}
