import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Project } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { Task } from '../task/entities/task.entity';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post(':id')
  async createProject(
    @Param('id') userId: number,
    @Body() projectData: CreateProjectDto,
  ): Promise<Project> {
    try {
      return await this.projectService.createProject(userId, projectData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post(':id/task')
  async createTask(
    @Param('id') projectId: number,
    @Body() taskData: CreateTaskDto,
  ): Promise<Task> {
    try {
      return await this.projectService.createTask(projectId, taskData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getOneProject(@Param('id') id: number): Promise<Project> {
    const project = await this.projectService.getOneProject(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Delete('id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    const project = await this.projectService.getOneProject(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return this.projectService.deleteProject(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() projectData: UpdateProjectDto,
  ): Promise<void> {
    const project = await this.projectService.getOneProject(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    try {
      return await this.projectService.updateProject(id, projectData);
    } catch (error) {
      throw new BadRequestException(error.message || 'Update failed');
    }
  }

  @Get('user/:id')
  async getAllProjects(@Param('id') id: number): Promise<Project[]> {
    const projects = await this.projectService.getUserProjects(id);
    if (!projects || projects.length === 0) {
      throw new NotFoundException(`No projects found for user ID ${id}`);
    }
    return projects;
  }

  @Get(':id/task')
  async getTasks(@Param('id') id: number): Promise<Task[]> {
    const task = await this.projectService.getTasks(id);
    if (!task) {
      throw new NotFoundException(`No tasks found for project with ID ${id}`);
    }
    return task;
  }
}
