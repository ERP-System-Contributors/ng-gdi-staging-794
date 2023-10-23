import dayjs from 'dayjs/esm';

import { IInstitutionCode, NewInstitutionCode } from './institution-code.model';

export const sampleWithRequiredData: IInstitutionCode = {
  id: 9008,
  institutionCode: 'cultivate',
  institutionName: 'payment',
};

export const sampleWithPartialData: IInstitutionCode = {
  id: 46435,
  institutionCode: 'eco-centric bottom-line programming',
  institutionName: 'robust bandwidth',
  shortName: 'Alabama',
  institutionCategory: 'Response Music integrated',
  institutionStatus: 'Infrastructure',
};

export const sampleWithFullData: IInstitutionCode = {
  id: 73224,
  institutionCode: 'Legacy',
  institutionName: 'National Berkshire',
  shortName: 'Movies',
  category: 'schemas Architect quantify',
  institutionCategory: 'bus',
  institutionOwnership: 'Tuna card Stand-alone',
  dateLicensed: dayjs('2022-04-05'),
  institutionStatus: 'Berkshire Avon reboot',
};

export const sampleWithNewData: NewInstitutionCode = {
  institutionCode: 'non-volatile',
  institutionName: 'generate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
