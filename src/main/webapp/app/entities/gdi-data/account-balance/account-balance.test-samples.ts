import dayjs from 'dayjs/esm';

import { IAccountBalance, NewAccountBalance } from './account-balance.model';

export const sampleWithRequiredData: IAccountBalance = {
  id: 98342,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Berkshire',
  accountContractNumber: '842488693583295',
  accruedInterestBalanceFCY: 63789,
  accruedInterestBalanceLCY: 66522,
  accountBalanceFCY: 25345,
  accountBalanceLCY: 87579,
};

export const sampleWithPartialData: IAccountBalance = {
  id: 35016,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Solutions payment extend',
  accountContractNumber: '344780150939877',
  accruedInterestBalanceFCY: 58148,
  accruedInterestBalanceLCY: 64063,
  accountBalanceFCY: 53322,
  accountBalanceLCY: 13992,
};

export const sampleWithFullData: IAccountBalance = {
  id: 44702,
  reportingDate: dayjs('2023-10-04'),
  customerId: 'support invoice integrate',
  accountContractNumber: '896343278260595',
  accruedInterestBalanceFCY: 97183,
  accruedInterestBalanceLCY: 67561,
  accountBalanceFCY: 40335,
  accountBalanceLCY: 84140,
};

export const sampleWithNewData: NewAccountBalance = {
  reportingDate: dayjs('2023-10-04'),
  customerId: 'convergence Cameroon Village',
  accountContractNumber: '918342377395805',
  accruedInterestBalanceFCY: 97477,
  accruedInterestBalanceLCY: 6982,
  accountBalanceFCY: 43158,
  accountBalanceLCY: 41937,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
