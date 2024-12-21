import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as cors from 'cors';
import { populateDatabase } from './on-start';
import { MovieRepository } from './infrastructure/repositories/Movie/Movie.repository';
import { ProducerRepository } from './infrastructure/repositories/Producer/Producer.repository';
import { MovieProducerRepository } from './infrastructure/repositories/MovieProducer/MovieProducer.repository';
import { StudioRepository } from './infrastructure/repositories/Studio/Studio.repository';
import { StudioMovieRepository } from './infrastructure/repositories/StudioMovie/StudioMovie.repository';

async function onInit(app: NestFastifyApplication) {
  const [
    movieRepository,
    producerRepository,
    movieProducerRepository,
    studioRepository,
    studioMovieRepository,
  ] = [
    app.get(MovieRepository),
    app.get(ProducerRepository),
    app.get(MovieProducerRepository),
    app.get(StudioRepository),
    app.get(StudioMovieRepository),
  ];

  await populateDatabase(
    movieRepository,
    producerRepository,
    movieProducerRepository,
    studioRepository,
    studioMovieRepository
  );

}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  await onInit(app);

  app.use(cors());

  await app.listen(3000);
}
bootstrap();
