export interface AwardsDetails {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface AwardsIntervals {
    min: AwardsDetails[];
    max: AwardsDetails[];
}