import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { Movie } from './infrastructure/entities/Movie.entity';
import { MovieRepository } from './infrastructure/repositories/Movie/Movie.repository';
import { Producer } from './infrastructure/entities/Producer.entity';
import { MovieProducerRepository } from './infrastructure/repositories/MovieProducer/MovieProducer.repository';
import { ProducerRepository } from './infrastructure/repositories/Producer/Producer.repository';
import { Studio } from './infrastructure/entities/Studio.entity';
import { StudioRepository } from './infrastructure/repositories/Studio/Studio.repository';
import { StudioMovieRepository } from './infrastructure/repositories/StudioMovie/StudioMovie.repository';

function extractNames(input: string): string[] {
    const sanitizedInput = input.replace(/\sand\s/g, ", ");
    const names = sanitizedInput.split(", ").map(name => name.trim());

    return names;
}

async function populateProducers(
    values: string[],
    headers: string[],
    movie: Movie,
    movieProducerRepository: MovieProducerRepository,
    producerRepository: ProducerRepository
): Promise<void> {
    const producers: Partial<Producer>[] = [
        ...new Set(
            extractNames(values[headers.indexOf('producers')])
        )
    ].map(name => ({ name }));

    for await (const p of producers) {
        let producer: Producer;

        producer = await producerRepository.findOne({ name: p.name });

        if (!producer) {
            producer = await producerRepository.create({ name: p.name });
        }

        await movieProducerRepository.create({
            movie_id: movie.id,
            producer_id: producer.id,
        });
    }
};

async function populateStudios(
    values: string[],
    headers: string[],
    movie: Movie,
    studioMovieRepository: StudioMovieRepository,
    studioRepository: StudioRepository
): Promise<void> {
    const studios: Partial<Studio>[] = [
        ...new Set(
            extractNames(values[headers.indexOf('studios')])
        )
    ].map(name => ({ name }));

    for await (const s of studios) {
        let studio: Studio;

        studio = await studioRepository.findOne({ name: s.name });

        if (!studio) {
            studio = await studioRepository.create({ name: s.name });
        }

        await studioMovieRepository.create({
            movie_id: movie.id,
            studio_id: studio.id,
        });
    }
}

export async function populateDatabase(
    movieRepository: MovieRepository,
    producerRepository: ProducerRepository,
    movieProducerRepository: MovieProducerRepository,
    studioRepository: StudioRepository,
    studioMovieRepository: StudioMovieRepository
): Promise<void> {
    const filePath = path.resolve(__dirname, '../src/assets/Movielist.csv');
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let isHeader = true;
    let headers: string[] = [];

    for await (const line of rl) {
        if (isHeader) {
            headers = line.split(';').map(header => header.trim());
            isHeader = false;
            continue;
        }

        const values = line.split(';').map(value => value.trim());

        const movie: Partial<Movie> = {
            year: parseInt(values[headers.indexOf('year')], 10),
            title: values[headers.indexOf('title')],
            winner: values[headers.indexOf('winner')] === 'yes',
        };

        const createdMovie = await movieRepository.create(movie);

        await populateProducers(values, headers, createdMovie, movieProducerRepository, producerRepository);
        await populateStudios(values, headers, createdMovie, studioMovieRepository, studioRepository);
    }
}