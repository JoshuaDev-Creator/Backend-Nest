import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { Repository } from 'typeorm';

export class ReminderService {
  constructor(
    @InjectRepository(Reminder)
    private reminderRepositary: Repository<Reminder>,
  ) {}

  createReminderForProject(reminderData: Partial<Reminder>): Promise<Reminder> {
    const data = this.reminderRepositary.create(reminderData);
    return this.reminderRepositary.save(data);
  }
}
