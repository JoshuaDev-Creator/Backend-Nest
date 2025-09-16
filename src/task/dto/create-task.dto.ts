import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'UserId is required' })
  userId: number;

  @IsNotEmpty({ message: 'Title is required' })
  @Length(2, 50, { message: 'Title must be between 2 and 50 characters' })
  title: string;

  @Length(10, 100, {
    message: 'Description must be between 10 and 100 characters',
  })
  description: string;

  @IsNotEmpty({ message: 'Priorty is required' })
  priority: string;

  @IsNotEmpty({ message: 'Due date is required' })
  dueDate: string;
}
