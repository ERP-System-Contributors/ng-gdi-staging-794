import { INatureOfCustomerComplaints, NewNatureOfCustomerComplaints } from './nature-of-customer-complaints.model';

export const sampleWithRequiredData: INatureOfCustomerComplaints = {
  id: 24119,
  natureOfComplaintTypeCode: 'violet Human Minnesota',
  natureOfComplaintType: 'Engineer',
};

export const sampleWithPartialData: INatureOfCustomerComplaints = {
  id: 61171,
  natureOfComplaintTypeCode: 'Quality-focused conglomeration',
  natureOfComplaintType: 'withdrawal client-server',
  natureOfComplaintTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: INatureOfCustomerComplaints = {
  id: 40586,
  natureOfComplaintTypeCode: 'Sweden deliver parse',
  natureOfComplaintType: 'alarm',
  natureOfComplaintTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewNatureOfCustomerComplaints = {
  natureOfComplaintTypeCode: 'Clothing',
  natureOfComplaintType: 'Skyway',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
