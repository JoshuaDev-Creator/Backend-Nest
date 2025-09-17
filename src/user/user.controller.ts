import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Req() req: Request,
    @Body() userData: UpdateUserDto,
  ): Promise<void> {
    const userId = (req as any).user['userId'];

    const user = await this.userService.getById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    try {
      return await this.userService.update(userId, userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('list')
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getById(@Req() req: Request): Promise<any> {
    const userId = (req as any).user['userId'];
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: Request): Promise<void> {
    const userId = (req as any).user['userId'];
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.userService.delete(userId);
  }
}
