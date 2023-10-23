import { IInstitutionContactDetails, NewInstitutionContactDetails } from './institution-contact-details.model';

export const sampleWithRequiredData: IInstitutionContactDetails = {
  id: 75691,
  entityId: 'Home copying relationships',
  entityName: 'Producer Vermont 24/7',
  contactType: 'synergies',
};

export const sampleWithPartialData: IInstitutionContactDetails = {
  id: 32496,
  entityId: 'Internal',
  entityName: 'Pass',
  contactType: 'Synchronised',
  contactLevel: 'Strategist bypassing',
  contactName: 'transition',
  contactDesignation: 'CSS Bedfordshire Small',
};

export const sampleWithFullData: IInstitutionContactDetails = {
  id: 10694,
  entityId: 'withdrawal bypass Federation',
  entityName: 'lavender',
  contactType: 'redefine deposit',
  contactLevel: 'maximize support synthesize',
  contactValue: 'world-class THX Metal',
  contactName: 'compressing redundant',
  contactDesignation: 'withdrawal',
};

export const sampleWithNewData: NewInstitutionContactDetails = {
  entityId: 'Burgs Wooden',
  entityName: 'compressing Anguilla Account',
  contactType: 'Generic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
