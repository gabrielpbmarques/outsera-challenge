import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Movie } from './Movie.entity';
import { Producer } from './Producer.entity';

@Entity()
export class MovieProducer {
  @PrimaryColumn()
  movie_id: number;

  @PrimaryColumn()
  producer_id: number;
}
