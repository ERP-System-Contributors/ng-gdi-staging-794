import dayjs from 'dayjs/esm';

import { ITerminalsAndPOS, NewTerminalsAndPOS } from './terminals-and-pos.model';

export const sampleWithRequiredData: ITerminalsAndPOS = {
  id: 93364,
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'system Peso SDR',
  merchantId: 'card RAM Account',
  terminalName: 'Account haptic Home',
  terminalLocation: 'synergistic',
  iso6709Latitute: 64209,
  iso6709Longitude: 18786,
  terminalOpeningDate: dayjs('2023-10-03'),
};

export const sampleWithPartialData: ITerminalsAndPOS = {
  id: 59911,
  reportingDate: dayjs('2023-10-04'),
  terminalId: 'Executive Plaza Cuban',
  merchantId: 'Garden Yuan',
  terminalName: 'Croatia Cotton Chair',
  terminalLocation: 'synthesize Global Creative',
  iso6709Latitute: 11928,
  iso6709Longitude: 7738,
  terminalOpeningDate: dayjs('2023-10-04'),
};

export const sampleWithFullData: ITerminalsAndPOS = {
  id: 90957,
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'Pants',
  merchantId: 'discrete',
  terminalName: 'neural Automotive XML',
  terminalLocation: 'back-end',
  iso6709Latitute: 56310,
  iso6709Longitude: 56350,
  terminalOpeningDate: dayjs('2023-10-03'),
  terminalClosureDate: dayjs('2023-10-03'),
};

export const sampleWithNewData: NewTerminalsAndPOS = {
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'Island Franc Ergonomic',
  merchantId: 'silver white',
  terminalName: 'open-source Automotive Division',
  terminalLocation: 'withdrawal',
  iso6709Latitute: 18161,
  iso6709Longitude: 20389,
  terminalOpeningDate: dayjs('2023-10-03'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
