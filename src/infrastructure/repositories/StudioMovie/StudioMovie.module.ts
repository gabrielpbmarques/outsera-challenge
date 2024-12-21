import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudioMovie } from '../../entities/StudioMovie.entity';
import { StudioMovieRepository } from './StudioMovie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudioMovie]),
  ],
  providers: [StudioMovieRepository],
  exports: [StudioMovieRepository],
})
export class StudioMovieModule {}
