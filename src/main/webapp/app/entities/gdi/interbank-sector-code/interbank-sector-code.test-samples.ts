import { IInterbankSectorCode, NewInterbankSectorCode } from './interbank-sector-code.model';

export const sampleWithRequiredData: IInterbankSectorCode = {
  id: 83156,
  interbankSectorCode: 'Designer Direct',
};

export const sampleWithPartialData: IInterbankSectorCode = {
  id: 47334,
  interbankSectorCode: 'Bedfordshire',
  interbankSectorCodeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IInterbankSectorCode = {
  id: 1476,
  interbankSectorCode: 'States',
  interbankSectorCodeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewInterbankSectorCode = {
  interbankSectorCode: 'Uruguay',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
