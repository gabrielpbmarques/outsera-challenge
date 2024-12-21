import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieProducer } from 'src/infrastructure/entities/MovieProducer.entity';

@Injectable()
export class MovieProducerRepository {
  constructor(
    @InjectRepository(MovieProducer)
    private repository: Repository<MovieProducer>,
  ) {}

  async create(movie: Partial<MovieProducer>): Promise<MovieProducer> {
    const entity = this.repository.create(movie);

    return this.repository.save(entity);
  }
  
  async find(query: Partial<MovieProducer>): Promise<MovieProducer[]> {
    return this.repository.find({
      where: query
    });
  }

  async listAll(): Promise<MovieProducer[]> {
    const result = await this.repository.find();

    return result;
  }
}
