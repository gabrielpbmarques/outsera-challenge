import { Controller, Get, Res } from '@nestjs/common';
import { AwardsIntervalsService } from './AwardsIntervals.service';
import { FastifyReply } from 'fastify';

@Controller('awards-intervals')
export class AwardsIntervalsController {
    constructor(
        private readonly awardsIntervalsService: AwardsIntervalsService
    ) {}

    @Get()
    async handle(
        @Res() reply: FastifyReply
    ): Promise<void> {
        const result = await this.awardsIntervalsService.execute();

        reply.status(200).send(result);
    }
}
