import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudioMovie } from 'src/infrastructure/entities/StudioMovie.entity';

@Injectable()
export class StudioMovieRepository {
  constructor(
    @InjectRepository(StudioMovie)
    private repository: Repository<StudioMovie>,
  ) {}

  async create(movie: Partial<StudioMovie>): Promise<StudioMovie> {
    const entity = this.repository.create(movie);

    return this.repository.save(entity);
  }
  
  async find(query: Partial<StudioMovie>): Promise<StudioMovie[]> {
    return this.repository.find({
      where: query
    });
  }

  async listAll(): Promise<StudioMovie[]> {
    const result = await this.repository.find();

    return result;
  } 
}
