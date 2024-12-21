import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../entities/Movie.entity';
import { MovieRepository } from './Movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
  ],
  providers: [MovieRepository],
  exports: [MovieRepository],
})
export class MovieModule {}
