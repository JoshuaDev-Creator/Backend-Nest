import { IsOptional, Length } from 'class-validator';

export class updateTaskDto {
  @IsOptional()
  @Length(2, 50)
  title?: string;

  @IsOptional()
  @Length(10, 100)
  description?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  priority?: string;
}
