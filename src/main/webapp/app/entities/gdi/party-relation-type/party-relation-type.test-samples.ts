import { IPartyRelationType, NewPartyRelationType } from './party-relation-type.model';

export const sampleWithRequiredData: IPartyRelationType = {
  id: 28256,
  partyRelationTypeCode: 'Account',
  partyRelationType: 'Yemeni',
};

export const sampleWithPartialData: IPartyRelationType = {
  id: 2631,
  partyRelationTypeCode: 'service-desk',
  partyRelationType: 'Computer Tanzanian',
};

export const sampleWithFullData: IPartyRelationType = {
  id: 66260,
  partyRelationTypeCode: 'secured Fresh',
  partyRelationType: 'mobile District interface',
  partyRelationTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPartyRelationType = {
  partyRelationTypeCode: 'synthesize',
  partyRelationType: 'open-source Isle Administrator',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
