import { IProfessionalQualification, NewProfessionalQualification } from './professional-qualification.model';

export const sampleWithRequiredData: IProfessionalQualification = {
  id: 50172,
  professionalQualificationsCode: 'Naira virtual',
  professionalQualificationsType: 'Grocery Granite',
};

export const sampleWithPartialData: IProfessionalQualification = {
  id: 73834,
  professionalQualificationsCode: 'navigate Focused',
  professionalQualificationsType: 'Producer Avon visualize',
};

export const sampleWithFullData: IProfessionalQualification = {
  id: 89053,
  professionalQualificationsCode: 'heuristic Future Hawaii',
  professionalQualificationsType: 'Samoa',
  professionalQualificationsDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewProfessionalQualification = {
  professionalQualificationsCode: 'Handcrafted',
  professionalQualificationsType: 'Cambridgeshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
