import { IAcademicQualification, NewAcademicQualification } from './academic-qualification.model';

export const sampleWithRequiredData: IAcademicQualification = {
  id: 33738,
  academicQualificationsCode: 'Outdoors',
  academicQualificationType: 'Pass Kansas',
};

export const sampleWithPartialData: IAcademicQualification = {
  id: 98521,
  academicQualificationsCode: 'Hat Alabama',
  academicQualificationType: 'global Generic',
};

export const sampleWithFullData: IAcademicQualification = {
  id: 39403,
  academicQualificationsCode: 'Polarised interface',
  academicQualificationType: 'application',
  academicQualificationTypeDetail: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAcademicQualification = {
  academicQualificationsCode: 'Games Wooden',
  academicQualificationType: 'deposit Argentina platforms',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
