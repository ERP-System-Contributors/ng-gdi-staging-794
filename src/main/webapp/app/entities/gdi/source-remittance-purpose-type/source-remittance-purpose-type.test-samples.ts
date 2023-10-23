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

import { SourceOrPurposeOfRemittancFlag } from 'app/entities/enumerations/source-or-purpose-of-remittanc-flag.model';

import { ISourceRemittancePurposeType, NewSourceRemittancePurposeType } from './source-remittance-purpose-type.model';

export const sampleWithRequiredData: ISourceRemittancePurposeType = {
  id: 6545,
  sourceOrPurposeTypeCode: 'relationships leading-edge Awesome',
  sourceOrPurposeOfRemittanceFlag: SourceOrPurposeOfRemittancFlag['PURPOSE_OF_REMITTANCE'],
  sourceOrPurposeOfRemittanceType: 'synthesizing Operations',
};

export const sampleWithPartialData: ISourceRemittancePurposeType = {
  id: 59360,
  sourceOrPurposeTypeCode: 'support revolutionary Account',
  sourceOrPurposeOfRemittanceFlag: SourceOrPurposeOfRemittancFlag['SOURCE_OF_FUNDS'],
  sourceOrPurposeOfRemittanceType: 'driver open-source',
  remittancePurposeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ISourceRemittancePurposeType = {
  id: 30626,
  sourceOrPurposeTypeCode: 'Wooden high-level',
  sourceOrPurposeOfRemittanceFlag: SourceOrPurposeOfRemittancFlag['PURPOSE_OF_REMITTANCE'],
  sourceOrPurposeOfRemittanceType: 'Codes',
  remittancePurposeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewSourceRemittancePurposeType = {
  sourceOrPurposeTypeCode: 'Camp Generic Bacon',
  sourceOrPurposeOfRemittanceFlag: SourceOrPurposeOfRemittancFlag['PURPOSE_OF_REMITTANCE'],
  sourceOrPurposeOfRemittanceType: 'help-desk leading Innovative',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
