import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update.task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() taskData: CreateTaskDto): Promise<Task> {
    return this.taskService.createTaskForProject(taskData);
  }

  @Delete(':id')
  deleteTask(id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Put(':id')
  updateTask(id: number, @Body() taskData: updateTaskDto): Promise<void> {
    return this.taskService.updateTask(id, taskData);
  }

  @Get(':id')
  getOneTask(id: number): Promise<Task | null> {
    return this.taskService.getOneTasK(id);
  }
}
