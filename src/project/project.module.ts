import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Task } from 'src/task/entities/task.entity';
import { Reminder } from 'src/reminder/entities/reminder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task, Reminder])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
