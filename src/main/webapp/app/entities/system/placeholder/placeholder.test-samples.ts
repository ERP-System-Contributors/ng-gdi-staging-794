import { IPlaceholder, NewPlaceholder } from './placeholder.model';

export const sampleWithRequiredData: IPlaceholder = {
  id: 40261,
  description: 'enhance',
};

export const sampleWithPartialData: IPlaceholder = {
  id: 84861,
  description: "Pa'anga withdrawal JSON",
};

export const sampleWithFullData: IPlaceholder = {
  id: 34404,
  description: 'yellow',
  token: 'Frozen frictionless',
};

export const sampleWithNewData: NewPlaceholder = {
  description: 'Card Garden',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
