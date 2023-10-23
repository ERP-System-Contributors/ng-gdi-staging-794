import { ICrbComplaintStatusType, NewCrbComplaintStatusType } from './crb-complaint-status-type.model';

export const sampleWithRequiredData: ICrbComplaintStatusType = {
  id: 92335,
  complaintStatusTypeCode: 'copying world-class',
  complaintStatusType: 'Account Concrete Books',
};

export const sampleWithPartialData: ICrbComplaintStatusType = {
  id: 26937,
  complaintStatusTypeCode: 'global Checking',
  complaintStatusType: 'invoice Analyst bypass',
  complaintStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbComplaintStatusType = {
  id: 78801,
  complaintStatusTypeCode: 'firewall Texas Applications',
  complaintStatusType: 'compressing card Borders',
  complaintStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbComplaintStatusType = {
  complaintStatusTypeCode: 'Pants Architect',
  complaintStatusType: 'optical cross-media',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
