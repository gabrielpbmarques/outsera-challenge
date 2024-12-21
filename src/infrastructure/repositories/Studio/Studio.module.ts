import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from '../../entities/Studio.entity';
import { StudioRepository } from './Studio.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Studio]),
  ],
  providers: [StudioRepository],
  exports: [StudioRepository],
})
export class StudioModule {}
