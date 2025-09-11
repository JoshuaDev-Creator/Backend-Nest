import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';
import { createProjectDto } from './dto/create-project.dto';
import { updateProjectDto } from './dto/update-project.dto';
import { Task } from 'src/task/entities/task.entity';

Injectable;
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepositary: Repository<Project>,
  ) {}

  async createProjectForUser(projectData: createProjectDto): Promise<Project> {
    const project = this.projectRepositary.create(projectData);
    return this.projectRepositary.save(project);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepositary.delete(id);
  }

  async updateProject(
    id: number,
    projectData: updateProjectDto,
  ): Promise<void> {
    await this.projectRepositary.update(id, projectData);
  }

  async getOneProject(id: number): Promise<Project | null> {
    return this.projectRepositary.findOneBy({ id });
  }

  async getTasksOfProject(id: number): Promise<Project | null> {
    return this.projectRepositary.findOne({
      where: { id: id },
      relations: ['tasks'],
    });
  }
}
