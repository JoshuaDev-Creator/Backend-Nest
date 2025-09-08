import { Body, Controller, Post } from '@nestjs/common';
import { Task } from 'src/task/entitity/Task-entity';
import { TaskService } from 'src/task/Task-service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.createTaskForProject(taskData);
  }
}
