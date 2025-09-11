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

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 50 })
  priority: string;

  @Column({ type: 'date', nullable: true })
  due_date: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Project, (Project) => Project.task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  projectId: Project;

  @ManyToOne(() => User, (User) => User.task)
  @JoinColumn({ name: 'assigned_to' })
  user: User;
}
