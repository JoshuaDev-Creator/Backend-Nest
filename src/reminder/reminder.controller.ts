import { Body, Controller, Post } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { Reminder } from './entities/reminder.entity';

@Controller('reminders')
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  @Post()
  createReminder(@Body() reminderData: Partial<Reminder>): Promise<Reminder> {
    return this.reminderService.createReminderForProject(reminderData);
  }
}
