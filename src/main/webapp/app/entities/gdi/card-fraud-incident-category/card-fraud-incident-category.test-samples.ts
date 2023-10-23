import { ICardFraudIncidentCategory, NewCardFraudIncidentCategory } from './card-fraud-incident-category.model';

export const sampleWithRequiredData: ICardFraudIncidentCategory = {
  id: 98129,
  cardFraudCategoryTypeCode: 'Cambridgeshire Synchronised',
  cardFraudCategoryType: 'Kids Chief',
};

export const sampleWithPartialData: ICardFraudIncidentCategory = {
  id: 19975,
  cardFraudCategoryTypeCode: 'Health Franc',
  cardFraudCategoryType: 'mobile Future-proofed Forest',
};

export const sampleWithFullData: ICardFraudIncidentCategory = {
  id: 11968,
  cardFraudCategoryTypeCode: 'RAM Plastic firewall',
  cardFraudCategoryType: 'Implementation Mayotte',
  cardFraudCategoryTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardFraudIncidentCategory = {
  cardFraudCategoryTypeCode: 'Borders',
  cardFraudCategoryType: 'Taka state',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
