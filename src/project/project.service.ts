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

  async createProject(
    userId: number,
    projectData: CreateProjectDto,
  ): Promise<Project> {
    try {
      const project = this.projectRepository.create({
        ...projectData,
        user: { id: userId },
      });
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createTask(projectId: number, taskData: CreateTaskDto): Promise<Task> {
    console.log(taskData);
    try {
      const task = this.taskRepository.create({
        ...taskData,
        project: { id: projectId },
        user: { id: taskData.userId },
      });
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOneProject(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async deleteProject(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async updateProject(
    id: number,
    projectData: UpdateProjectDto,
  ): Promise<void> {
    const result = await this.projectRepository.update(id, projectData);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async getUserProjects(id: number): Promise<Project[]> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }
    try {
      const projects = await this.projectRepository.find({
        where: { user: { id } },
      });

      if (!projects || projects.length === 0) {
        throw new NotFoundException(`No projects found for user with ID ${id}`);
      }
      return projects;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch projects for user ${id}: ${error.message}`,
      );
    }
  }

  async getTasks(id: number): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { project: { id } },
    });
    if (!tasks) {
      throw new NotFoundException(`No tasks  for project ID ${id}`);
    }
    return tasks;
  }
}
