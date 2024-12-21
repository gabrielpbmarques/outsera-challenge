import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studio } from '../../entities/Studio.entity';

@Injectable()
export class StudioRepository {
  constructor(
    @InjectRepository(Studio)
    private repository: Repository<Studio>,
  ) {}

  async create(movie: Partial<Studio>): Promise<Studio> {
    const entity = this.repository.create(movie);

    return this.repository.save(entity);
  }
  
  async find(query: Partial<Studio>): Promise<Studio[]> {
    return this.repository.find({
      where: query
    });
  }

  async findOne(query: Partial<Studio>): Promise<Studio> {
    return this.repository.findOne({
      where: query
    });
  }

  async listAll(): Promise<Studio[]> {
    const result = await this.repository.find();

    return result;
  }
}
