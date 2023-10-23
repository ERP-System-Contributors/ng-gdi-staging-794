import dayjs from 'dayjs/esm';

import { IParticularsOfOutlet, NewParticularsOfOutlet } from './particulars-of-outlet.model';

export const sampleWithRequiredData: IParticularsOfOutlet = {
  id: 28064,
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Key',
  town: 'paradigm seamless Incredible',
  iso6709Latitute: 7308,
  iso6709Longitude: 18308,
  cbkApprovalDate: dayjs('2023-10-04'),
  outletOpeningDate: dayjs('2023-10-04'),
  licenseFeePayable: 35853,
};

export const sampleWithPartialData: IParticularsOfOutlet = {
  id: 92185,
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Horizontal unleash matrix',
  town: 'Steel green',
  iso6709Latitute: 89867,
  iso6709Longitude: 77606,
  cbkApprovalDate: dayjs('2023-10-03'),
  outletOpeningDate: dayjs('2023-10-03'),
  outletClosureDate: dayjs('2023-10-04'),
  licenseFeePayable: 23970,
};

export const sampleWithFullData: IParticularsOfOutlet = {
  id: 94069,
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Executive',
  town: 'synergistic bypassing Ruble',
  iso6709Latitute: 75607,
  iso6709Longitude: 2046,
  cbkApprovalDate: dayjs('2023-10-03'),
  outletOpeningDate: dayjs('2023-10-03'),
  outletClosureDate: dayjs('2023-10-03'),
  licenseFeePayable: 90229,
};

export const sampleWithNewData: NewParticularsOfOutlet = {
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Tools',
  town: 'Texas',
  iso6709Latitute: 81721,
  iso6709Longitude: 32695,
  cbkApprovalDate: dayjs('2023-10-03'),
  outletOpeningDate: dayjs('2023-10-03'),
  licenseFeePayable: 20345,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
