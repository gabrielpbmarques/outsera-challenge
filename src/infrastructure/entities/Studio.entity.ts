import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { StudioMovie } from './StudioMovie.entity';
import { Movie } from './Movie.entity';

@Entity()
export class Studio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Movie, (movie) => movie.studios)
    @JoinTable({
        name: 'studio_movie',
        joinColumn: { name: 'studio_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    })
    movies: Movie[];
}
