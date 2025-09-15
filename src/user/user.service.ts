import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(userData);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['email', 'name'],
    });
  }

  async GetRecentUsers(): Promise<User[]> {
    return this.userRepository.find({
      order: { createdAt: 'ASC' },
      take: 5,
    });
  }

  async getUserById(id: number): Promise<{ email: string; name: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['email', 'name'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async deleteUserById(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async UpdateUser(id: number, userData: UpdateUserDto): Promise<void> {
    const result = await this.userRepository.update(id, userData);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
