import { MandatoryFieldFlagTypes } from 'app/entities/enumerations/mandatory-field-flag-types.model';

import { IAccountAttributeMetadata, NewAccountAttributeMetadata } from './account-attribute-metadata.model';

export const sampleWithRequiredData: IAccountAttributeMetadata = {
  id: 52925,
  precedence: 2453,
  columnName: 'Bike',
  shortName: 'lavender Kong',
  dataType: 'multi-tasking withdrawal',
  mandatoryFieldFlag: MandatoryFieldFlagTypes['N'],
};

export const sampleWithPartialData: IAccountAttributeMetadata = {
  id: 40998,
  precedence: 70247,
  columnName: 'Frozen Usability Licensed',
  shortName: 'synthesizing',
  detailedDefinition: '../fake-data/blob/hipster.txt',
  dataType: 'Account Outdoors',
  mandatoryFieldFlag: MandatoryFieldFlagTypes['N'],
  dbColumnName: 'Security Investor withdrawal',
  metadataVersion: 8807,
};

export const sampleWithFullData: IAccountAttributeMetadata = {
  id: 10957,
  precedence: 12317,
  columnName: 'Digitized',
  shortName: 'definition quantify Marshall',
  detailedDefinition: '../fake-data/blob/hipster.txt',
  dataType: 'teal bluetooth',
  length: 18955,
  columnIndex: 'transparent transition',
  mandatoryFieldFlag: MandatoryFieldFlagTypes['Y'],
  businessValidation: '../fake-data/blob/hipster.txt',
  technicalValidation: '../fake-data/blob/hipster.txt',
  dbColumnName: 'web-enabled Lights red',
  metadataVersion: 6605,
};

export const sampleWithNewData: NewAccountAttributeMetadata = {
  precedence: 67186,
  columnName: 'Portugal synthesize',
  shortName: 'innovate enterprise port',
  dataType: 'input Music',
  mandatoryFieldFlag: MandatoryFieldFlagTypes['N'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
