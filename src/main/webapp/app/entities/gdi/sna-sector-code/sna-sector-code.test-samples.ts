import { ISnaSectorCode, NewSnaSectorCode } from './sna-sector-code.model';

export const sampleWithRequiredData: ISnaSectorCode = {
  id: 18473,
  sectorTypeCode: 'Ariary olive Florida',
};

export const sampleWithPartialData: ISnaSectorCode = {
  id: 10016,
  sectorTypeCode: 'payment Account',
  mainSectorCode: 'Fundamental Forward',
  subSectorCode: 'protocol',
  subSectorName: 'withdrawal XML',
  subSubSectorCode: 'quantifying',
};

export const sampleWithFullData: ISnaSectorCode = {
  id: 49475,
  sectorTypeCode: 'reboot Intelligent Quality',
  mainSectorCode: 'e-commerce',
  mainSectorTypeName: 'AGP solid',
  subSectorCode: 'Markets plug-and-play Chief',
  subSectorName: 'ivory Data payment',
  subSubSectorCode: 'Table Plastic',
  subSubSectorName: 'Nepalese',
};

export const sampleWithNewData: NewSnaSectorCode = {
  sectorTypeCode: 'Spring Fresh infomediaries',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
