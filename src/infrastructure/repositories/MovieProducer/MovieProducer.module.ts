import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieProducerRepository } from './MovieProducer.repository';
import { MovieProducer } from 'src/infrastructure/entities/MovieProducer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieProducer]),
  ],
  providers: [MovieProducerRepository],
  exports: [MovieProducerRepository],
})
export class MovieProducerModule {}
