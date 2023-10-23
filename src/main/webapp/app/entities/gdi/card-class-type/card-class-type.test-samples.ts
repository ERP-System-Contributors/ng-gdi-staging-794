import { ICardClassType, NewCardClassType } from './card-class-type.model';

export const sampleWithRequiredData: ICardClassType = {
  id: 37539,
  cardClassTypeCode: 'back-end',
  cardClassType: 'Chicken engage FTP',
};

export const sampleWithPartialData: ICardClassType = {
  id: 47634,
  cardClassTypeCode: 'Caribbean Team-oriented Rubber',
  cardClassType: 'methodologies Intelligent Specialist',
  cardClassDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICardClassType = {
  id: 72636,
  cardClassTypeCode: 'circuit',
  cardClassType: 'withdrawal Corporate embrace',
  cardClassDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardClassType = {
  cardClassTypeCode: 'Outdoors',
  cardClassType: 'virtual deposit',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
