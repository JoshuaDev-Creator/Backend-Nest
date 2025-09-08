import { Body, Controller, Post } from '@nestjs/common';
import { Project } from 'src/project/entitity/Project-entity';
import { ProjectService } from 'src/project/Project-service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  creatProject(@Body() projectdata: Partial<Project>): Promise<Project> {
    return this.projectService.createProjectForUser(projectdata);
  }
}
