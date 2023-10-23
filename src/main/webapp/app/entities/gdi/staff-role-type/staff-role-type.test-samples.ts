import { IStaffRoleType, NewStaffRoleType } from './staff-role-type.model';

export const sampleWithRequiredData: IStaffRoleType = {
  id: 85362,
  staffRoleTypeCode: 'Cotton analyzing',
  staffRoleType: 'world-class Central',
};

export const sampleWithPartialData: IStaffRoleType = {
  id: 55688,
  staffRoleTypeCode: 'Cotton',
  staffRoleType: 'user-centric Tuna',
  staffRoleTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IStaffRoleType = {
  id: 58814,
  staffRoleTypeCode: 'Ford',
  staffRoleType: 'blue copy Awesome',
  staffRoleTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewStaffRoleType = {
  staffRoleTypeCode: 'facilitate Soap',
  staffRoleType: 'Bedfordshire calculating Mongolia',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
