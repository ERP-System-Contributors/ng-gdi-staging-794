import { ICrbProductServiceFeeType, NewCrbProductServiceFeeType } from './crb-product-service-fee-type.model';

export const sampleWithRequiredData: ICrbProductServiceFeeType = {
  id: 40124,
  chargeTypeCode: 'Suriname',
  chargeTypeCategory: 'quantify Refined partnerships',
};

export const sampleWithPartialData: ICrbProductServiceFeeType = {
  id: 83419,
  chargeTypeCode: 'Investment',
  chargeTypeDescription: 'Books Barbados',
  chargeTypeCategory: 'auxiliary Fish Innovative',
};

export const sampleWithFullData: ICrbProductServiceFeeType = {
  id: 42495,
  chargeTypeCode: 'Fresh Oro Customer',
  chargeTypeDescription: 'Netherlands Stravenue purple',
  chargeTypeCategory: 'AGP',
};

export const sampleWithNewData: NewCrbProductServiceFeeType = {
  chargeTypeCode: 'Arizona Jewelery',
  chargeTypeCategory: 'leverage Handcrafted',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
