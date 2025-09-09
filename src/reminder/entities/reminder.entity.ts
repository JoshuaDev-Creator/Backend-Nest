import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (User) => User.reminder)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Project, (project) => project.reminder)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  title: string;

  @Column({ type: 'timestamp' })
  meeting_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
