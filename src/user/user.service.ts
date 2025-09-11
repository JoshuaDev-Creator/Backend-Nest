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
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(userData);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message || 'User creation failed');
    }
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async getOneUser(id: number): Promise<{ email: string; name: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['email', 'name'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async UpdateUser(id: number, userData: UpdateUserDto): Promise<void> {
    const result = await this.userRepository.update(id, userData);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async GetRecentUsers(): Promise<User[]> {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }

  async getCorrespondingUserProjects(id: number): Promise<Project[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['projects'], // eager load projects
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!user.projects || user.projects.length === 0) {
      throw new NotFoundException(`No projects found for user ID ${id}`);
    }

    return user.projects;
  }
}
