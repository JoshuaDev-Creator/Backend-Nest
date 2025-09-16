import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Task> {
    const task = await this.taskService.getById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    return task;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() taskData: UpdateTaskDto,
  ): Promise<void> {
    const task = await this.taskService.getById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    try {
      return await this.taskService.update(id, taskData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const task = await this.taskService.getById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    return this.taskService.delete(id);
  }
}
