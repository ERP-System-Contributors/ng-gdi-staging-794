import { ShareholdingFlagTypes } from 'app/entities/enumerations/shareholding-flag-types.model';

import { IShareHoldingFlag, NewShareHoldingFlag } from './share-holding-flag.model';

export const sampleWithRequiredData: IShareHoldingFlag = {
  id: 38208,
  shareholdingFlagTypeCode: ShareholdingFlagTypes['Y'],
  shareholdingFlagType: 'Fully-configurable 24/365 of',
};

export const sampleWithPartialData: IShareHoldingFlag = {
  id: 35638,
  shareholdingFlagTypeCode: ShareholdingFlagTypes['N'],
  shareholdingFlagType: 'Vatu Refined Soft',
};

export const sampleWithFullData: IShareHoldingFlag = {
  id: 19184,
  shareholdingFlagTypeCode: ShareholdingFlagTypes['Y'],
  shareholdingFlagType: 'Rwanda Burundi Investor',
  shareholdingTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewShareHoldingFlag = {
  shareholdingFlagTypeCode: ShareholdingFlagTypes['Y'],
  shareholdingFlagType: 'Soap back-end exuding',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
