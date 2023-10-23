import { CardPerformanceFlags } from 'app/entities/enumerations/card-performance-flags.model';

import { ICardPerformanceFlag, NewCardPerformanceFlag } from './card-performance-flag.model';

export const sampleWithRequiredData: ICardPerformanceFlag = {
  id: 73818,
  cardPerformanceFlag: CardPerformanceFlags['Y'],
  cardPerformanceFlagDescription: 'static',
};

export const sampleWithPartialData: ICardPerformanceFlag = {
  id: 89362,
  cardPerformanceFlag: CardPerformanceFlags['Y'],
  cardPerformanceFlagDescription: 'Rustic',
  cardPerformanceFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICardPerformanceFlag = {
  id: 94793,
  cardPerformanceFlag: CardPerformanceFlags['Y'],
  cardPerformanceFlagDescription: 'Accountability Flat',
  cardPerformanceFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardPerformanceFlag = {
  cardPerformanceFlag: CardPerformanceFlags['N'],
  cardPerformanceFlagDescription: 'efficient service-desk',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
