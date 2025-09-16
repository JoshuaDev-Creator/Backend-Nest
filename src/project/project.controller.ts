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

  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() data: CreateProjectDto,
  ): Promise<Project> {
    try {
      return await this.projectService.create(userId, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post(':id/task')
  async createTaskByProjectId(
    @Param('id') id: number,
    @Body() data: CreateTaskDto,
  ): Promise<Task> {
    try {
      return await this.projectService.createTaskByProjectId(id, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Project> {
    const project = await this.projectService.getById(id);
    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);
    return project;
  }

  @Delete('id')
  async delete(@Param('id') id: number): Promise<void> {
    const project = await this.projectService.getById(id);
    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);
    return this.projectService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProjectDto,
  ): Promise<void> {
    const project = await this.projectService.getById(id);
    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);
    try {
      return await this.projectService.update(id, data);
    } catch (error) {
      throw new BadRequestException(error.message || 'Update failed');
    }
  }

  @Get('user/:userId')
  async getAllByUserId(@Param('userId') userId: number): Promise<Project[]> {
    const projects = await this.projectService.getAllByUserId(userId);
    if (!projects || projects.length === 0)
      throw new NotFoundException(`No projects found for user ID ${userId}`);
    return projects;
  }

  @Get(':id/task')
  async getTaskByProjectId(@Param('id') id: number): Promise<Task[]> {
    const task = await this.projectService.getTaskByProjectId(id);
    if (!task) {
      throw new NotFoundException(`No tasks found for project with ID ${id}`);
    }
    return task;
  }
}
