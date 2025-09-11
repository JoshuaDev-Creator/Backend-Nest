import { IsOptional, Length } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @Length(2, 50)
  title?: string;

  @IsOptional()
  @Length(10, 100)
  description?: string;

  @IsOptional()
  end_date?: string;
}
