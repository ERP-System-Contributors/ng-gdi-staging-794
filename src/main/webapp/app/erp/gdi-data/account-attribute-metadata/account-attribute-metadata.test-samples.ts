///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
