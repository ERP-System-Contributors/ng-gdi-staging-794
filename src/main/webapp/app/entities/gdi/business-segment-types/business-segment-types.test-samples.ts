import { IBusinessSegmentTypes, NewBusinessSegmentTypes } from './business-segment-types.model';

export const sampleWithRequiredData: IBusinessSegmentTypes = {
  id: 77491,
  businessEconomicSegmentCode: 'Bedfordshire',
  businessEconomicSegment: 'Dynamic Computers',
};

export const sampleWithPartialData: IBusinessSegmentTypes = {
  id: 42369,
  businessEconomicSegmentCode: 'Bike Unbranded orchestration',
  businessEconomicSegment: 'Shoes Executive',
};

export const sampleWithFullData: IBusinessSegmentTypes = {
  id: 35515,
  businessEconomicSegmentCode: 'world-class Wall circuit',
  businessEconomicSegment: 'compelling',
  details: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewBusinessSegmentTypes = {
  businessEconomicSegmentCode: 'end-to-end program Metal',
  businessEconomicSegment: 'Intranet Savings',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
