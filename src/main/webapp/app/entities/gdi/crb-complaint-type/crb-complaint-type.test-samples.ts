import { ICrbComplaintType, NewCrbComplaintType } from './crb-complaint-type.model';

export const sampleWithRequiredData: ICrbComplaintType = {
  id: 40372,
  complaintTypeCode: 'web-enabled Refined',
  complaintType: 'Assurance SSL',
};

export const sampleWithPartialData: ICrbComplaintType = {
  id: 27770,
  complaintTypeCode: 'Legacy Unbranded Generic',
  complaintType: 'synergies',
  complaintTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbComplaintType = {
  id: 17883,
  complaintTypeCode: 'Director Buckinghamshire schemas',
  complaintType: 'backing Jewelery Licensed',
  complaintTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbComplaintType = {
  complaintTypeCode: 'Berkshire program well-modulated',
  complaintType: 'Avon Generic models',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
