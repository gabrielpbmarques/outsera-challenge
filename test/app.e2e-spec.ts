import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { ProducerRepository } from 'src/infrastructure/repositories/Producer/Producer.repository';

jest.mock('src/infrastructure/repositories/Producer/Producer.repository');

const mockProducersWithMovies: any = [
  {
    id: 1,
    name: 'Producer A',
    movies: [
      { title: 'Movie 1', year: 2000 },
      { title: 'Movie 2', year: 1995 },
    ],
  },
  {
    id: 2,
    name: 'Producer B',
    movies: [
      { title: 'Movie 3', year: 2010 },
      { title: 'Movie 4', year: 2005 },
    ],
  },
];

describe('AwardsIntervalsController (e2e)', () => {
  let app: INestApplication;
  let producerRepository: ProducerRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    producerRepository = moduleFixture.get<ProducerRepository>(ProducerRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/awards-intervals (GET)', async () => {
    jest
      .spyOn(producerRepository, 'listProducerWithWinnerMovies')
      .mockResolvedValue(mockProducersWithMovies);

    const response = await request(app.getHttpServer())
      .get('/awards-intervals')
      .expect(200);

    expect(response.body).toEqual({
      min: [
        {
          producer: 'Producer A',
          interval: 5,
          previousWin: 1995,
          followingWin: 2000,
        },
        {
          producer: 'Producer B',
          interval: 5,
          previousWin: 2005,
          followingWin: 2010,
        },
      ],
      max: [
        {
          producer: 'Producer A',
          interval: 5,
          previousWin: 1995,
          followingWin: 2000,
        },
        {
          producer: 'Producer B',
          interval: 5,
          previousWin: 2005,
          followingWin: 2010,
        },
      ],
    });
  });
});
