import { ICollateralType, NewCollateralType } from './collateral-type.model';

export const sampleWithRequiredData: ICollateralType = {
  id: 34522,
  collateralTypeCode: 'copy Intelligent',
  collateralType: 'incubate',
};

export const sampleWithPartialData: ICollateralType = {
  id: 62611,
  collateralTypeCode: 'Buckinghamshire Assimilated',
  collateralType: 'maroon Boliviano',
  collateralTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICollateralType = {
  id: 94325,
  collateralTypeCode: 'program',
  collateralType: 'Cyprus Mouse Garden',
  collateralTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCollateralType = {
  collateralTypeCode: 'Human Car Cross-group',
  collateralType: 'payment application',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
