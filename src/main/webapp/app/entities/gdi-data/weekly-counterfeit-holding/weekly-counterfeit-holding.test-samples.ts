import dayjs from 'dayjs/esm';

import { IWeeklyCounterfeitHolding, NewWeeklyCounterfeitHolding } from './weekly-counterfeit-holding.model';

export const sampleWithRequiredData: IWeeklyCounterfeitHolding = {
  id: 17144,
  reportingDate: dayjs('2023-10-03'),
  dateConfiscated: dayjs('2023-10-03'),
  serialNumber: 'Territories 3rd Generic',
  depositorsNames: 'regional Knoll',
  tellersNames: 'Chicken encryption Shoes',
  dateSubmittedToCBK: dayjs('2023-10-03'),
};

export const sampleWithPartialData: IWeeklyCounterfeitHolding = {
  id: 77730,
  reportingDate: dayjs('2023-10-03'),
  dateConfiscated: dayjs('2023-10-04'),
  serialNumber: 'out-of-the-box indigo e-services',
  depositorsNames: 'Bacon',
  tellersNames: 'lavender User-centric',
  dateSubmittedToCBK: dayjs('2023-10-04'),
};

export const sampleWithFullData: IWeeklyCounterfeitHolding = {
  id: 33160,
  reportingDate: dayjs('2023-10-03'),
  dateConfiscated: dayjs('2023-10-03'),
  serialNumber: 'Division Mountain withdrawal',
  depositorsNames: 'reboot deposit foreground',
  tellersNames: 'Enhanced markets',
  dateSubmittedToCBK: dayjs('2023-10-03'),
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewWeeklyCounterfeitHolding = {
  reportingDate: dayjs('2023-10-04'),
  dateConfiscated: dayjs('2023-10-03'),
  serialNumber: 'copying program Rustic',
  depositorsNames: 'payment Liberian Program',
  tellersNames: 'Architect COM',
  dateSubmittedToCBK: dayjs('2023-10-03'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
