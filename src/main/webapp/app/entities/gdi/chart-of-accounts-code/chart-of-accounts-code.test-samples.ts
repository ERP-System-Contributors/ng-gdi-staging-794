import { IChartOfAccountsCode, NewChartOfAccountsCode } from './chart-of-accounts-code.model';

export const sampleWithRequiredData: IChartOfAccountsCode = {
  id: 54410,
  chartOfAccountsCode: 'paradigm Mouse',
  chartOfAccountsClass: 'deliver Investment',
};

export const sampleWithPartialData: IChartOfAccountsCode = {
  id: 72365,
  chartOfAccountsCode: 'Visionary disintermediate Pants',
  chartOfAccountsClass: 'hacking copying',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IChartOfAccountsCode = {
  id: 45054,
  chartOfAccountsCode: 'indexing real-time',
  chartOfAccountsClass: 'incubate',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewChartOfAccountsCode = {
  chartOfAccountsCode: 'Malagasy cyan',
  chartOfAccountsClass: 'Regional',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
