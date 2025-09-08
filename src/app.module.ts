import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Project } from './project/entities/project.entity';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { Task } from './task/entities/task.entity';
import { TaskController } from './task/task.controllers';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [User, Project, Task],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Project, Task]),
  ],

  controllers: [UserController, ProjectController, TaskController],
  providers: [UserService, ProjectService, TaskService],
})
export class AppModule {}
