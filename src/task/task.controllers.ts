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
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() taskData: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskService.createTaskForProject(taskData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    const task = await this.taskService.getOneTask(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.taskService.deleteTask(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() taskData: UpdateTaskDto,
  ): Promise<void> {
    const task = await this.taskService.getOneTask(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    try {
      return await this.taskService.updateTask(id, taskData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getOneTask(@Param('id') id: number): Promise<Task> {
    const task = await this.taskService.getOneTask(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
