import { CounterpartyCategory } from 'app/entities/enumerations/counterparty-category.model';

import { ICounterPartyCategory, NewCounterPartyCategory } from './counter-party-category.model';

export const sampleWithRequiredData: ICounterPartyCategory = {
  id: 48227,
  counterpartyCategoryCode: 'Sports Games Causeway',
  counterpartyCategoryCodeDetails: CounterpartyCategory['LOCAL'],
};

export const sampleWithPartialData: ICounterPartyCategory = {
  id: 9131,
  counterpartyCategoryCode: 'Health',
  counterpartyCategoryCodeDetails: CounterpartyCategory['LOCAL'],
};

export const sampleWithFullData: ICounterPartyCategory = {
  id: 77999,
  counterpartyCategoryCode: 'SSL Buckinghamshire',
  counterpartyCategoryCodeDetails: CounterpartyCategory['LOCAL'],
  counterpartyCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCounterPartyCategory = {
  counterpartyCategoryCode: 'green Account',
  counterpartyCategoryCodeDetails: CounterpartyCategory['FOREIGN'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
