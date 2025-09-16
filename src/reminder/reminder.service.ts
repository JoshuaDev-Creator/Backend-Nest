import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { Repository } from 'typeorm';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(Reminder)
    private reminderRepository: Repository<Reminder>,
  ) {}

  async create(reminderData: CreateReminderDto): Promise<Reminder> {
    try {
      const reminder = this.reminderRepository.create(reminderData);
      return await this.reminderRepository.save(reminder);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<Reminder> {
    const reminder = await this.reminderRepository.findOneBy({ id });
    if (!reminder)
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    return reminder;
  }

  async delete(id: number): Promise<void> {
    const result = await this.reminderRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Reminder with ID ${id} not found`);
  }
}
