import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';

Injectable;
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepositary: Repository<Project>,
  ) {}

  async createProjectForUser(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepositary.create(projectData);
    return this.projectRepositary.save(project);
  }
}
