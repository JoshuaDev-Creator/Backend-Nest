import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProjectForUser(projectData: CreateProjectDto): Promise<Project> {
    try {
      const project = this.projectRepository.create(projectData);
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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

  async getOneProject(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async getTasksOfProject(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!project) {
      throw new NotFoundException(
        `No project or tasks found for project ID ${id}`,
      );
    }
    return project;
  }
}
