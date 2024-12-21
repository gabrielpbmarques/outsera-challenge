import { Module } from '@nestjs/common';
import { AwardsIntervalsService } from './AwardsIntervals.service';
import { AwardsIntervalsController } from './AwardsIntervals.controller';
import { ProducerModule } from 'src/infrastructure/repositories/Producer/Producer.module';

@Module({
    imports: [
        ProducerModule
    ],
    providers: [
        AwardsIntervalsService
    ],
    controllers: [AwardsIntervalsController]
})
export class AwardsIntervalsModule {}
