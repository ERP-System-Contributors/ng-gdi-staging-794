import { IMoratoriumItem, NewMoratoriumItem } from './moratorium-item.model';

export const sampleWithRequiredData: IMoratoriumItem = {
  id: 75368,
  moratoriumItemTypeCode: 'Investment mobile initiatives',
  moratoriumItemType: 'Indiana',
};

export const sampleWithPartialData: IMoratoriumItem = {
  id: 26254,
  moratoriumItemTypeCode: 'HDD Loan Singapore',
  moratoriumItemType: 'Market Research panel',
  moratoriumTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IMoratoriumItem = {
  id: 66965,
  moratoriumItemTypeCode: 'Gorgeous',
  moratoriumItemType: 'indexing Program',
  moratoriumTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewMoratoriumItem = {
  moratoriumItemTypeCode: 'quantify Minnesota',
  moratoriumItemType: 'withdrawal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
