import dayjs from 'dayjs/esm';

import { IRelatedPartyRelationship, NewRelatedPartyRelationship } from './related-party-relationship.model';

export const sampleWithRequiredData: IRelatedPartyRelationship = {
  id: 7428,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Avon',
  relatedPartyId: 'plum',
};

export const sampleWithPartialData: IRelatedPartyRelationship = {
  id: 89910,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Track',
  relatedPartyId: 'green Cotton online',
};

export const sampleWithFullData: IRelatedPartyRelationship = {
  id: 72229,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'deliver cyan Chips',
  relatedPartyId: 'York',
};

export const sampleWithNewData: NewRelatedPartyRelationship = {
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Steel Walks',
  relatedPartyId: 'Granite defect',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
