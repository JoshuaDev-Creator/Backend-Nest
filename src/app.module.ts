import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entitity/User-entity';
import { UserService } from './user/User-service';
import { UserController } from './user/User-controller';
import { Project } from './project/entitity/Project-entity';
import { ProjectController } from './project/Project-controller';
import { ProjectService } from './project/Project-service';
import { Task } from './task/entitity/Task-entity';
import { TaskController } from './task/Task-controllers';
import { TaskService } from './task/Task-service';

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
