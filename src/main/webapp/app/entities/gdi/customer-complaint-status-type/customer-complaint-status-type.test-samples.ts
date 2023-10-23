import { ICustomerComplaintStatusType, NewCustomerComplaintStatusType } from './customer-complaint-status-type.model';

export const sampleWithRequiredData: ICustomerComplaintStatusType = {
  id: 77368,
  customerComplaintStatusTypeCode: 'Proactive',
  customerComplaintStatusType: 'Graphical Music',
};

export const sampleWithPartialData: ICustomerComplaintStatusType = {
  id: 35351,
  customerComplaintStatusTypeCode: 'Intuitive',
  customerComplaintStatusType: 'Lights Marketing Oklahoma',
  customerComplaintStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICustomerComplaintStatusType = {
  id: 49710,
  customerComplaintStatusTypeCode: 'seize',
  customerComplaintStatusType: 'Arkansas reintermediate Ways',
  customerComplaintStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCustomerComplaintStatusType = {
  customerComplaintStatusTypeCode: 'Fresh array Crossroad',
  customerComplaintStatusType: 'Steel payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
