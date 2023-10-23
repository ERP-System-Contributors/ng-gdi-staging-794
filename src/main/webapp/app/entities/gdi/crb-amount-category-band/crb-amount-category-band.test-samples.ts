import { ICrbAmountCategoryBand, NewCrbAmountCategoryBand } from './crb-amount-category-band.model';

export const sampleWithRequiredData: ICrbAmountCategoryBand = {
  id: 55035,
  amountCategoryBandCode: 'withdrawal portal Facilitator',
  amountCategoryBand: 'Home Missouri contextually-based',
};

export const sampleWithPartialData: ICrbAmountCategoryBand = {
  id: 59003,
  amountCategoryBandCode: 'withdrawal Intranet Bedfordshire',
  amountCategoryBand: 'Grocery Comoro Planner',
};

export const sampleWithFullData: ICrbAmountCategoryBand = {
  id: 96013,
  amountCategoryBandCode: 'Managed value-added',
  amountCategoryBand: 'Avon optical flexibility',
  amountCategoryBandDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbAmountCategoryBand = {
  amountCategoryBandCode: 'Open-architected PCI',
  amountCategoryBand: 'index Developer',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
