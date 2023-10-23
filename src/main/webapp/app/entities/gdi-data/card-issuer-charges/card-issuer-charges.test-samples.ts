import dayjs from 'dayjs/esm';

import { ICardIssuerCharges, NewCardIssuerCharges } from './card-issuer-charges.model';

export const sampleWithRequiredData: ICardIssuerCharges = {
  id: 81810,
  reportingDate: dayjs('2023-10-03'),
  cardFeeChargeInLCY: 5792,
};

export const sampleWithPartialData: ICardIssuerCharges = {
  id: 741,
  reportingDate: dayjs('2023-10-04'),
  cardFeeChargeInLCY: 78252,
};

export const sampleWithFullData: ICardIssuerCharges = {
  id: 10237,
  reportingDate: dayjs('2023-10-04'),
  cardFeeChargeInLCY: 45263,
};

export const sampleWithNewData: NewCardIssuerCharges = {
  reportingDate: dayjs('2023-10-04'),
  cardFeeChargeInLCY: 71236,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
