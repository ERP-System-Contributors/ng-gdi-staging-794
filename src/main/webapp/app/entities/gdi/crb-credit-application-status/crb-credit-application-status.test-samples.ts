import { ICrbCreditApplicationStatus, NewCrbCreditApplicationStatus } from './crb-credit-application-status.model';

export const sampleWithRequiredData: ICrbCreditApplicationStatus = {
  id: 54718,
  crbCreditApplicationStatusTypeCode: 'incubate',
  crbCreditApplicationStatusType: 'communities',
};

export const sampleWithPartialData: ICrbCreditApplicationStatus = {
  id: 44523,
  crbCreditApplicationStatusTypeCode: 'Direct Automotive',
  crbCreditApplicationStatusType: 'Gabon quantify index',
  crbCreditApplicationStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbCreditApplicationStatus = {
  id: 63830,
  crbCreditApplicationStatusTypeCode: 'SCSI blue',
  crbCreditApplicationStatusType: 'Car',
  crbCreditApplicationStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbCreditApplicationStatus = {
  crbCreditApplicationStatusTypeCode: 'Buckinghamshire Specialist',
  crbCreditApplicationStatusType: 'indigo teal Handcrafted',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
