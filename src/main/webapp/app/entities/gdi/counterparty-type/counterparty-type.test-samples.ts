import { ICounterpartyType, NewCounterpartyType } from './counterparty-type.model';

export const sampleWithRequiredData: ICounterpartyType = {
  id: 22447,
  counterpartyTypeCode: 'grey Cloned Maryland',
  counterPartyType: 'deposit partnerships',
};

export const sampleWithPartialData: ICounterpartyType = {
  id: 66139,
  counterpartyTypeCode: 'partnerships Somalia',
  counterPartyType: 'partnerships',
  counterpartyTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICounterpartyType = {
  id: 98821,
  counterpartyTypeCode: 'Response copying Hungary',
  counterPartyType: 'Networked Chicken',
  counterpartyTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCounterpartyType = {
  counterpartyTypeCode: 'Bedfordshire',
  counterPartyType: 'Tuna',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
