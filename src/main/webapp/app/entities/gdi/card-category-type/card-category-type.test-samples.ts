import { CardCategoryFlag } from 'app/entities/enumerations/card-category-flag.model';

import { ICardCategoryType, NewCardCategoryType } from './card-category-type.model';

export const sampleWithRequiredData: ICardCategoryType = {
  id: 2362,
  cardCategoryFlag: CardCategoryFlag['I'],
  cardCategoryDescription: 'indexing Skyway Lira',
};

export const sampleWithPartialData: ICardCategoryType = {
  id: 44431,
  cardCategoryFlag: CardCategoryFlag['L'],
  cardCategoryDescription: 'bypass',
  cardCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICardCategoryType = {
  id: 59954,
  cardCategoryFlag: CardCategoryFlag['L'],
  cardCategoryDescription: 'back-end',
  cardCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardCategoryType = {
  cardCategoryFlag: CardCategoryFlag['I'],
  cardCategoryDescription: 'Lek Planner',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
