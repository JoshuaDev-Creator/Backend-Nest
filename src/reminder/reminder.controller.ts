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

@Controller('reminder')
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  @Post()
  async create(@Body() data: CreateReminderDto): Promise<Reminder> {
    try {
      return await this.reminderService.create(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('id')
  async getById(@Param('id') id: number): Promise<Reminder> {
    const reminder = await this.reminderService.getById(id);
    if (!reminder)
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    return reminder;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const reminder = await this.reminderService.getById(id);
    if (!reminder)
      throw new NotFoundException(`Reminder with ID ${id} not found`);

    return this.reminderService.delete(id);
  }
}
