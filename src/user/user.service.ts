import { Injectable } from '@nestjs/common';
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

  async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getOne(id: number): Promise<{ email: string; name: string } | null> {
    return this.userRepository.findOne({
      where: { id },
      select: ['email', 'name'],
    });
  }

  async Update(id: number, userData: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, userData);
  }

  async GetRecentUsers(): Promise<User[]> {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }

  async getCorrespondingUserProjects(id: number): Promise<Project[]> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['projects'],
    });
    return user?.projects || [];
  }
}
