import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

import { ICardStatusFlag, NewCardStatusFlag } from './card-status-flag.model';

export const sampleWithRequiredData: ICardStatusFlag = {
  id: 55080,
  cardStatusFlag: FlagCodes['Y'],
  cardStatusFlagDescription: 'Ergonomic Facilitator South',
};

export const sampleWithPartialData: ICardStatusFlag = {
  id: 46224,
  cardStatusFlag: FlagCodes['Y'],
  cardStatusFlagDescription: 'Buckinghamshire granular',
};

export const sampleWithFullData: ICardStatusFlag = {
  id: 91913,
  cardStatusFlag: FlagCodes['N'],
  cardStatusFlagDescription: 'conglomeration',
  cardStatusFlagDetails: 'synthesize',
};

export const sampleWithNewData: NewCardStatusFlag = {
  cardStatusFlag: FlagCodes['N'],
  cardStatusFlagDescription: 'e-markets',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
