import { Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Title is required' })
  @Length(2, 50, { message: 'Title must be between 2 and 50 characters' })
  title: string;

  @IsOptional()
  @Length(10, 100, {
    message: 'Description must be between 10 and 100 characters',
  })
  description: string;

  @IsNotEmpty({ message: 'Start date is required' })
  start_date: string;

  @IsNotEmpty({ message: 'Start date is required' })
  end_date: string;
}
