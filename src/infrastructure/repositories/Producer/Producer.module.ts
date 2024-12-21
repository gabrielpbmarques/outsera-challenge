import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerRepository } from './Producer.repository';
import { Producer } from 'src/infrastructure/entities/Producer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer]),
  ],
  providers: [ProducerRepository],
  exports: [ProducerRepository],
})
export class ProducerModule {}
