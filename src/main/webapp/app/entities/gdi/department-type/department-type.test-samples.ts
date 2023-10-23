import { IDepartmentType, NewDepartmentType } from './department-type.model';

export const sampleWithRequiredData: IDepartmentType = {
  id: 41004,
  departmentTypeCode: 'mobile EXE Polarised',
  departmentType: 'Washington',
};

export const sampleWithPartialData: IDepartmentType = {
  id: 76908,
  departmentTypeCode: 'Loan Borders',
  departmentType: 'partnerships Garden Wooden',
  departmentTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDepartmentType = {
  id: 9423,
  departmentTypeCode: 'systematic indigo Quality-focused',
  departmentType: 'haptic Ergonomic',
  departmentTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDepartmentType = {
  departmentTypeCode: 'logistical Group',
  departmentType: 'Rubber',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
