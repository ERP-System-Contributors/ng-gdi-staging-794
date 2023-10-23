import { IStaffCurrentEmploymentStatus, NewStaffCurrentEmploymentStatus } from './staff-current-employment-status.model';

export const sampleWithRequiredData: IStaffCurrentEmploymentStatus = {
  id: 77045,
  staffCurrentEmploymentStatusTypeCode: 'Branch',
  staffCurrentEmploymentStatusType: 'Mozambique',
};

export const sampleWithPartialData: IStaffCurrentEmploymentStatus = {
  id: 5629,
  staffCurrentEmploymentStatusTypeCode: 'calculating',
  staffCurrentEmploymentStatusType: 'e-commerce Niger Legacy',
};

export const sampleWithFullData: IStaffCurrentEmploymentStatus = {
  id: 23419,
  staffCurrentEmploymentStatusTypeCode: 'National Officer hard',
  staffCurrentEmploymentStatusType: 'Shilling Cotton PNG',
  staffCurrentEmploymentStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewStaffCurrentEmploymentStatus = {
  staffCurrentEmploymentStatusTypeCode: 'Buckinghamshire',
  staffCurrentEmploymentStatusType: 'neutral task-force',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
