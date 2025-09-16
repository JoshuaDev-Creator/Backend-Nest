import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(userId: number, data: CreateProjectDto): Promise<Project> {
    try {
      const project = this.projectRepository.create({
        ...data,
        user: { id: userId },
      });
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createTaskByProjectId(
    projectId: number,
    data: CreateTaskDto,
  ): Promise<Task> {
    try {
      const task = this.taskRepository.create({
        ...data,
        project: { id: projectId },
        user: { id: data.userId },
      });
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async delete(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async update(id: number, data: UpdateProjectDto): Promise<void> {
    const result = await this.projectRepository.update(id, data);
    if (result.affected === 0)
      throw new NotFoundException(`Project with ID ${id} not found`);
  }

  async getAllByUserId(id: number): Promise<Project[]> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }
    try {
      const projects = await this.projectRepository.find({
        where: { user: { id } },
      });

      if (!projects || projects.length === 0)
        throw new NotFoundException(`No projects found for user with ID ${id}`);

      return projects;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch projects for user ${id}: ${error.message}`,
      );
    }
  }

  async getTaskByProjectId(id: number): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { project: { id } },
    });
    if (!tasks) throw new NotFoundException(`No tasks  for project ID ${id}`);

    return tasks;
  }
}
