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
import { on } from 'events';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column()
  priority: string;

  @Column({ type: 'timestamp' })
  due_date: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Project, (Project) => Project.task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  projectId: Project;

  @ManyToOne(() => User, (User) => User.task, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assigned_to' })
  user: User;
}
