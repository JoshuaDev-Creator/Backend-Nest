import {
  Body,
  Controller,
  Delete,
  Post,
  Param,
  NotFoundException,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { Reminder } from './entities/reminder.entity';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Controller('reminders')
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  @Post()
  async createReminder(
    @Body() reminderData: CreateReminderDto,
  ): Promise<Reminder> {
    try {
      return await this.reminderService.createReminderForProject(reminderData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('id')
  async getReminderById(@Param('id') id: number): Promise<Reminder> {
    const reminder = await this.reminderService.getOneReminder(id);
    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }
    return reminder;
  }

  @Delete(':id')
  async deleteReminderById(@Param('id') id: number): Promise<void> {
    const reminder = await this.reminderService.getOneReminder(id);
    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }
    return this.reminderService.deleteReminder(id);
  }
}
