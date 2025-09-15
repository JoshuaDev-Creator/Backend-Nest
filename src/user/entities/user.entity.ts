import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Task } from '../../task/entities/task.entity';
import { Reminder } from '../../reminder/entities/reminder.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Task, (Task) => Task.user)
  task: Task[];

  @OneToOne(() => Reminder, (Reminder) => Reminder.user)
  reminder: Reminder;
}
