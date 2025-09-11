import { IsNotEmpty, Length } from 'class-validator';

export class createReminderDto {
  @IsNotEmpty()
  @Length(2, 50)
  title: string;

  @IsNotEmpty()
  meetingDate: string;

  @IsNotEmpty()
  meetingTime: string;
}
