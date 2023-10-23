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
