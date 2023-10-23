import { ILoanRestructureItem, NewLoanRestructureItem } from './loan-restructure-item.model';

export const sampleWithRequiredData: ILoanRestructureItem = {
  id: 41493,
  loanRestructureItemCode: 'TCP Cotton',
  loanRestructureItemType: 'Fish withdrawal',
};

export const sampleWithPartialData: ILoanRestructureItem = {
  id: 83216,
  loanRestructureItemCode: 'Outdoors',
  loanRestructureItemType: 'Dynamic',
  loanRestructureItemDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanRestructureItem = {
  id: 1360,
  loanRestructureItemCode: 'Avon',
  loanRestructureItemType: 'SMTP',
  loanRestructureItemDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanRestructureItem = {
  loanRestructureItemCode: 'optimizing success',
  loanRestructureItemType: 'strategic Concrete',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
