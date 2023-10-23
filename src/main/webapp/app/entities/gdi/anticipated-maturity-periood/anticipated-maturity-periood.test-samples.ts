import { IAnticipatedMaturityPeriood, NewAnticipatedMaturityPeriood } from './anticipated-maturity-periood.model';

export const sampleWithRequiredData: IAnticipatedMaturityPeriood = {
  id: 5696,
  anticipatedMaturityTenorCode: 'Lebanese',
  aniticipatedMaturityTenorType: 'Tactics',
};

export const sampleWithPartialData: IAnticipatedMaturityPeriood = {
  id: 59539,
  anticipatedMaturityTenorCode: 'Security optical Gourde',
  aniticipatedMaturityTenorType: 'Brazil open-source',
};

export const sampleWithFullData: IAnticipatedMaturityPeriood = {
  id: 42298,
  anticipatedMaturityTenorCode: 'virtual',
  aniticipatedMaturityTenorType: 'protocol',
  anticipatedMaturityTenorDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAnticipatedMaturityPeriood = {
  anticipatedMaturityTenorCode: 'Re-engineered',
  aniticipatedMaturityTenorType: 'function JSON syndicate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
