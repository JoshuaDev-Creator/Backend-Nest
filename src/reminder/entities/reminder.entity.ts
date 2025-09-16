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

  @Column()
  title: string;

  @Column({ type: 'date' })
  meetingDate: Date;

  @Column({ type: 'time without time zone' })
  meetingTime: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne(() => User, (User) => User.reminder)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Project, (project) => project.reminder)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
