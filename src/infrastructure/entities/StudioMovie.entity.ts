import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Movie } from './Movie.entity';
import { Studio } from './Studio.entity';

@Entity()
export class StudioMovie {
  @PrimaryColumn()
  movie_id: number;

  @PrimaryColumn()
  studio_id: number;
}
