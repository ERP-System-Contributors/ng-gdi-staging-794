import { IDerivativeUnderlyingAsset, NewDerivativeUnderlyingAsset } from './derivative-underlying-asset.model';

export const sampleWithRequiredData: IDerivativeUnderlyingAsset = {
  id: 15167,
  derivativeUnderlyingAssetTypeCode: 'deposit communities Falkland',
  financialDerivativeUnderlyingAssetType: 'Connecticut object-oriented Pula',
};

export const sampleWithPartialData: IDerivativeUnderlyingAsset = {
  id: 93998,
  derivativeUnderlyingAssetTypeCode: 'Plastic Greens Awesome',
  financialDerivativeUnderlyingAssetType: 'brand invoice',
  derivativeUnderlyingAssetTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDerivativeUnderlyingAsset = {
  id: 16051,
  derivativeUnderlyingAssetTypeCode: 'Handmade B2B',
  financialDerivativeUnderlyingAssetType: 'optimal grid-enabled',
  derivativeUnderlyingAssetTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDerivativeUnderlyingAsset = {
  derivativeUnderlyingAssetTypeCode: 'Games Down-sized cross-media',
  financialDerivativeUnderlyingAssetType: 'COM',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
