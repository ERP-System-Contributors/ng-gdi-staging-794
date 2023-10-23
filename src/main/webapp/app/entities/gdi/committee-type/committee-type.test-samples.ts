import { ICommitteeType, NewCommitteeType } from './committee-type.model';

export const sampleWithRequiredData: ICommitteeType = {
  id: 82795,
  committeeTypeCode: 'Estates Plastic Shoals',
};

export const sampleWithPartialData: ICommitteeType = {
  id: 1637,
  committeeTypeCode: 'experiences Berkshire',
  committeeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICommitteeType = {
  id: 83009,
  committeeTypeCode: 'Savings virtual',
  committeeType: 'blue Phased',
  committeeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCommitteeType = {
  committeeTypeCode: 'robust ubiquitous',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
