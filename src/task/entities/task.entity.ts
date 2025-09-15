import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.PENDING, type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  @Column()
  priority: string;

  @Column({ type: 'timestamp', name: 'due_date' })
  dueDate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Project, (Project) => Project.task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (User) => User.task, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assigned_to' })
  user: User;
}
