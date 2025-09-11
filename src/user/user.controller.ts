import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
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
    return this.userService.create(userData);
  }

  @Delete(':id')
  async deleteUser(id: number): Promise<void> {
    return this.userService.delete(id);
  }

  @Get(':id')
  async getOneUser(id: number): Promise<any> {
    return this.userService.getOne(id);
  }
  @Put(':id')
  async UpdateUser(id: number, @Body() userData: UpdateUserDto): Promise<void> {
    return this.userService.Update(id, userData);
  }

  @Get()
  async GetRecentUsers(): Promise<User[]> {
    return this.userService.GetRecentUsers();
  }

  @Get('id')
  async getProjectsOfUser(id: number): Promise<Project[]> {
    return this.userService.getCorrespondingUserProjects(id);
  }
}
