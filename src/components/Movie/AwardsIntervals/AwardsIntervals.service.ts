import { Injectable } from '@nestjs/common';
import { Movie } from 'src/infrastructure/entities/Movie.entity';
import { Producer } from 'src/infrastructure/entities/Producer.entity';
import { ProducerRepository } from 'src/infrastructure/repositories/Producer/Producer.repository';
import { AwardsDetails, AwardsIntervals } from 'src/infrastructure/responses/models/AwardsIntervals.model';

@Injectable()
export class AwardsIntervalsService {
    constructor(
        private readonly producerRepository: ProducerRepository,
    ) {}

    async execute(): Promise<AwardsIntervals> {
        const producersWithMovies = await this.producerRepository.listProducerWithWinnerMovies();
        const filteredProducers = producersWithMovies.filter(producer => producer.movies.length > 1);

        const awardsDetailsMatrix = filteredProducers.map((producer) => this.getAwardsDetails(producer, producer.movies));

        const awardsDetails = awardsDetailsMatrix.flat().filter(interval => interval);

        const { interval: minInterval } = awardsDetails.sort((a, b) => a.interval - b.interval)[0];
        const { interval: maxInterval } = awardsDetails.sort((a, b) => b.interval - a.interval)[0];

        const result: AwardsIntervals = {
            min: awardsDetails.filter(interval => interval.interval === minInterval),
            max: awardsDetails.filter(interval => interval.interval === maxInterval),
        };

        return result;
    }

    private getAwardsDetails(producer: Producer, movies: Movie[]): AwardsDetails[] {
        return movies.map((movie, index, movies) => {
            if (index === 0) return null;

            const prev = movies[index - 1];
            const current = movie;

            const interval = prev.year - current.year;

            return {
                producer: producer.name,
                interval,
                previousWin: current.year,
                followingWin: prev.year,
            }
        });
    }
}
