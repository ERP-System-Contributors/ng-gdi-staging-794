import { IGdiMasterDataIndex, NewGdiMasterDataIndex } from './gdi-master-data-index.model';

export const sampleWithRequiredData: IGdiMasterDataIndex = {
  id: 71458,
  entityName: 'Enterprise-wide firewall robust',
  databaseName: 'parse Bacon',
};

export const sampleWithPartialData: IGdiMasterDataIndex = {
  id: 35382,
  entityName: 'purple Small PCI',
  databaseName: 'Dollar SDD needs-based',
  businessDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IGdiMasterDataIndex = {
  id: 40469,
  entityName: 'Applications Infrastructure',
  databaseName: 'quantify 24/7 Electronics',
  businessDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewGdiMasterDataIndex = {
  entityName: 'Palau Operations Personal',
  databaseName: 'Sausages',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
