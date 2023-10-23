import { genderTypes } from 'app/entities/enumerations/gender-types.model';

import { IGenderType, NewGenderType } from './gender-type.model';

export const sampleWithRequiredData: IGenderType = {
  id: 48734,
  genderCode: 'Checking Clothing',
  genderType: genderTypes['CORPORATE'],
};

export const sampleWithPartialData: IGenderType = {
  id: 28428,
  genderCode: 'Savings value-added neural-net',
  genderType: genderTypes['OTHERS'],
  genderDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IGenderType = {
  id: 47535,
  genderCode: 'Honduras transmitting',
  genderType: genderTypes['INTERSEX'],
  genderDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewGenderType = {
  genderCode: 'multi-byte Chief',
  genderType: genderTypes['FEMALE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
