import { IsOptional, Length } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @Length(2, 50)
  title?: string;

  @IsOptional()
  @Length(10, 100)
  description?: string;

  @IsOptional()
  status?: TaskStatus;

  @IsOptional()
  priority?: string;

  @IsOptional()
  dueDate?: string;
}
