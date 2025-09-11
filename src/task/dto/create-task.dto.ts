import { IsEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @IsEmpty({ message: 'Title is required' })
  @Length(2, 50, { message: 'Title must be between 2 and 50 characters' })
  title: string;

  @Length(10, 100, {
    message: 'Description must be between 10 and 100 characters',
  })
  descriptiom: string;

  @IsEmpty({ message: 'Priorty is required' })
  priorty: string;
}
