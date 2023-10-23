import { ShareHolderTypes } from 'app/entities/enumerations/share-holder-types.model';

import { IShareholderType, NewShareholderType } from './shareholder-type.model';

export const sampleWithRequiredData: IShareholderType = {
  id: 59356,
  shareHolderTypeCode: 'alarm',
  shareHolderType: ShareHolderTypes['CORPORATE'],
};

export const sampleWithPartialData: IShareholderType = {
  id: 33494,
  shareHolderTypeCode: 'Nevada Idaho',
  shareHolderType: ShareHolderTypes['PARTNERSHIP'],
};

export const sampleWithFullData: IShareholderType = {
  id: 42646,
  shareHolderTypeCode: 'mindshare violet',
  shareHolderType: ShareHolderTypes['INDIVIDUAL'],
};

export const sampleWithNewData: NewShareholderType = {
  shareHolderTypeCode: 'lavender markets optical',
  shareHolderType: ShareHolderTypes['PARTNERSHIP'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
