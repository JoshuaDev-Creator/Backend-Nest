import { Body, Controller, Post } from '@nestjs/common';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.createTaskForProject(taskData);
  }
}
