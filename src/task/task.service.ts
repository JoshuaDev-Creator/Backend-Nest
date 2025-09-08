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
}
