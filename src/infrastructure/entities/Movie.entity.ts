import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { MovieProducer } from './MovieProducer.entity';
import { StudioMovie } from './StudioMovie.entity';
import { Producer } from './Producer.entity';
import { Studio } from './Studio.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  winner: boolean;

  @ManyToMany(() => Producer, (producer) => producer.movies)
  producers: Producer[];

  @ManyToMany(() => Studio, (studio) => studio.movies)
  studios: Studio[];
}
