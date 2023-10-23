import dayjs from 'dayjs/esm';

import { IWeeklyCashHolding, NewWeeklyCashHolding } from './weekly-cash-holding.model';

export const sampleWithRequiredData: IWeeklyCashHolding = {
  id: 84355,
  reportingDate: dayjs('2023-10-03'),
  fitUnits: 84566,
  unfitUnits: 19981,
};

export const sampleWithPartialData: IWeeklyCashHolding = {
  id: 59150,
  reportingDate: dayjs('2023-10-03'),
  fitUnits: 19318,
  unfitUnits: 87588,
};

export const sampleWithFullData: IWeeklyCashHolding = {
  id: 84063,
  reportingDate: dayjs('2023-10-03'),
  fitUnits: 43086,
  unfitUnits: 92956,
};

export const sampleWithNewData: NewWeeklyCashHolding = {
  reportingDate: dayjs('2023-10-04'),
  fitUnits: 22303,
  unfitUnits: 85332,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
