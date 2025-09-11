import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';

export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepositary: Repository<Task>,
  ) {}

  createTaskForProject(TaskData: Partial<Task>) {
    const data = this.taskRepositary.create(TaskData);
    return this.taskRepositary.save(data);
  }
  async deleteTask(id: number): Promise<void> {
    await this.taskRepositary.delete(id);
  }

  async updateTask(id: number, taskData): Promise<void> {
    await this.taskRepositary.update(id, taskData);
  }

  async getOneTasK(id: number): Promise<Task | null> {
    return this.taskRepositary.findOneBy({ id });
  }
}
