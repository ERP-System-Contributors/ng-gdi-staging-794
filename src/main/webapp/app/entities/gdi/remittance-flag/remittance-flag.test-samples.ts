import { RemittanceTypeFlag } from 'app/entities/enumerations/remittance-type-flag.model';
import { RemittanceType } from 'app/entities/enumerations/remittance-type.model';

import { IRemittanceFlag, NewRemittanceFlag } from './remittance-flag.model';

export const sampleWithRequiredData: IRemittanceFlag = {
  id: 83038,
  remittanceTypeFlag: RemittanceTypeFlag['RMTIN'],
  remittanceType: RemittanceType['INFLOWS'],
};

export const sampleWithPartialData: IRemittanceFlag = {
  id: 5843,
  remittanceTypeFlag: RemittanceTypeFlag['RMTOUT'],
  remittanceType: RemittanceType['OUTFLOWS'],
};

export const sampleWithFullData: IRemittanceFlag = {
  id: 19516,
  remittanceTypeFlag: RemittanceTypeFlag['RMTIN'],
  remittanceType: RemittanceType['INFLOWS'],
  remittanceTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewRemittanceFlag = {
  remittanceTypeFlag: RemittanceTypeFlag['RMTOUT'],
  remittanceType: RemittanceType['OUTFLOWS'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
