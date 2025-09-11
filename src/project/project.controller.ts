import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { createProjectDto } from './dto/create-project.dto';
import { updateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  creatProject(@Body() projectdata: createProjectDto): Promise<Project> {
    return this.projectService.createProjectForUser(projectdata);
  }
  @Delete(':id')
  deleteProject(id: number): Promise<void> {
    return this.projectService.deleteProject(id);
  }

  @Put(':id')
  updateProject(id: number, projectdata: updateProjectDto): Promise<void> {
    return this.projectService.updateProject(id, projectdata);
  }

  @Get(':id')
  getOneProject(id: number): Promise<Project | null> {
    return this.projectService.getOneProject(id);
  }

  @Get(':id')
  getTasksOfProject(id: number): Promise<Project | null> {
    return this.projectService.getTasksOfProject(id);
  }
}
