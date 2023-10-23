import { AccountStatusTypes } from 'app/entities/enumerations/account-status-types.model';

import { IAccountStatusType, NewAccountStatusType } from './account-status-type.model';

export const sampleWithRequiredData: IAccountStatusType = {
  id: 51061,
  accountStatusCode: 'PNG SQL Ergonomic',
  accountStatusType: AccountStatusTypes['CLOSED'],
};

export const sampleWithPartialData: IAccountStatusType = {
  id: 73344,
  accountStatusCode: 'Coordinator Group',
  accountStatusType: AccountStatusTypes['CLOSED'],
  accountStatusDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IAccountStatusType = {
  id: 54440,
  accountStatusCode: 'customized Borders initiative',
  accountStatusType: AccountStatusTypes['DORMANT'],
  accountStatusDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAccountStatusType = {
  accountStatusCode: 'functionalities',
  accountStatusType: AccountStatusTypes['CLOSED'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
