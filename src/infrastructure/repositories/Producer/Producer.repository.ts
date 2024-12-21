import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from 'src/infrastructure/entities/Producer.entity';

@Injectable()
export class ProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private repository: Repository<Producer>,
  ) {}

  async create(movie: Partial<Producer>): Promise<Producer> {
    const entity = this.repository.create(movie);

    return this.repository.save(entity);
  }
  
  async find(query: Partial<Producer>): Promise<Producer[]> {
    return this.repository.find({
      where: query
    });
  }

  async findOne(query: Partial<Producer>): Promise<Producer> {
    return this.repository.findOne({
      where: query
    });
  }

  async listAll(): Promise<Producer[]> {
    const result = await this.repository.find();

    return result;
  }

  async listProducerWithWinnerMovies(): Promise<Producer[]> {
    const result = await this.repository
      .find({
        select: ['id', 'name'],
        relations: ['movies'],
        where: {
          movies: {
            winner: true
          }
        },
        order: {
          id: 'ASC',
          movies: {
            year: 'DESC'
          },
        }
      })

    return result;
  }
}
