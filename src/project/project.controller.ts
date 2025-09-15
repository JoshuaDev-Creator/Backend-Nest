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
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('/createProject')
  async createProject(@Body() projectData: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectService.createProjectForUser(projectData);
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

  @Delete('deleteProject/:id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    const project = await this.projectService.getOneProject(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return this.projectService.deleteProject(id);
  }

  @Put('updateProject/:id')
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

  @Get('allProjects/:id')
  async getAllProjects(@Param('id') id: number): Promise<Project[]> {
    const projects = await this.projectService.getUserProjects(id);
    if (!projects || projects.length === 0) {
      throw new NotFoundException(`No projects found for user ID ${id}`);
    }
    return projects;
  }

  // @Get(':id/tasks')
  // async getTasksOfProject(@Param('id') id: number): Promise<Project> {
  //   const project = await this.projectService.getTasksOfProject(id);
  //   if (!project) {
  //     throw new NotFoundException(`No tasks found for project with ID ${id}`);
  //   }
  //   return project;
  // }
}
