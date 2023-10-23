import { IBankBranchCode, NewBankBranchCode } from './bank-branch-code.model';

export const sampleWithRequiredData: IBankBranchCode = {
  id: 68336,
  bankName: 'Function-based International',
  branchCode: 'Chicken primary Jewelery',
};

export const sampleWithPartialData: IBankBranchCode = {
  id: 1713,
  bankName: 'Avon',
  branchCode: 'Home system',
  branchName: 'Trafficway',
};

export const sampleWithFullData: IBankBranchCode = {
  id: 59859,
  bankCode: 'Cotton deposit XSS',
  bankName: 'index',
  branchCode: 'Cheese olive',
  branchName: 'generate architect',
  notes: 'Vanuatu Frozen',
};

export const sampleWithNewData: NewBankBranchCode = {
  bankName: 'Grocery',
  branchCode: 'methodologies monitor',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
