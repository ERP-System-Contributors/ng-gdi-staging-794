import dayjs from 'dayjs/esm';

import { CollateralInsuredFlagTypes } from 'app/entities/enumerations/collateral-insured-flag-types.model';

import { ICollateralInformation, NewCollateralInformation } from './collateral-information.model';

export const sampleWithRequiredData: ICollateralInformation = {
  id: 12770,
  reportingDate: dayjs('2023-10-03'),
  collateralId: 'Coves monitor',
  loanContractId: '461481571678388',
  customerId: 'Account',
  collateralOMVInCCY: 92472,
  collateralFSVInLCY: 94890,
  amountCharged: 5986,
  insuredFlag: CollateralInsuredFlagTypes['Y'],
};

export const sampleWithPartialData: ICollateralInformation = {
  id: 79984,
  reportingDate: dayjs('2023-10-04'),
  collateralId: 'Rupee Gourde',
  loanContractId: '235733809342919',
  customerId: 'Tasty',
  registrationPropertyNumber: 'Usability Senior Forward',
  collateralOMVInCCY: 78518,
  collateralFSVInLCY: 65495,
  amountCharged: 98547,
  collateralDiscountRate: 49371,
  nameOfPropertyValuer: 'array Division Chief',
  collateralLastValuationDate: dayjs('2023-10-04'),
  insuredFlag: CollateralInsuredFlagTypes['N'],
  insuranceExpiryDate: dayjs('2023-10-04'),
  guaranteeInsurers: 'transparent',
};

export const sampleWithFullData: ICollateralInformation = {
  id: 49397,
  reportingDate: dayjs('2023-10-04'),
  collateralId: 'payment Fantastic Computers',
  loanContractId: '658768478732669',
  customerId: 'Chicken',
  registrationPropertyNumber: 'maximize',
  collateralOMVInCCY: 4201,
  collateralFSVInLCY: 26243,
  collateralDiscountedValue: 58375,
  amountCharged: 59946,
  collateralDiscountRate: 17485,
  loanToValueRatio: 49515,
  nameOfPropertyValuer: 'PNG synthesizing',
  collateralLastValuationDate: dayjs('2023-10-04'),
  insuredFlag: CollateralInsuredFlagTypes['N'],
  nameOfInsurer: 'Product Down-sized',
  amountInsured: 87936,
  insuranceExpiryDate: dayjs('2023-10-04'),
  guaranteeInsurers: 'impactful Accountability',
};

export const sampleWithNewData: NewCollateralInformation = {
  reportingDate: dayjs('2023-10-03'),
  collateralId: 'Solutions distributed Product',
  loanContractId: '694827809151632',
  customerId: 'JSON',
  collateralOMVInCCY: 51149,
  collateralFSVInLCY: 86381,
  amountCharged: 82739,
  insuredFlag: CollateralInsuredFlagTypes['N'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
