import { Module } from '@nestjs/common';
import { AwardsIntervalsModule } from './components/Movie/AwardsIntervals/AwardsIntervals.module';
import { MovieModule } from './infrastructure/repositories/Movie/Movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerModule } from './infrastructure/repositories/Producer/Producer.module';
import { MovieProducerModule } from './infrastructure/repositories/MovieProducer/MovieProducer.module';
import { StudioMovieModule } from './infrastructure/repositories/StudioMovie/StudioMovie.module';
import { StudioModule } from './infrastructure/repositories/Studio/Studio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AwardsIntervalsModule,
    MovieModule,
    ProducerModule,
    MovieProducerModule,
    StudioModule,
    StudioMovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
