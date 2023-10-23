import { ICrbRecordFileType, NewCrbRecordFileType } from './crb-record-file-type.model';

export const sampleWithRequiredData: ICrbRecordFileType = {
  id: 88186,
  recordFileTypeCode: 'Grocery neutral',
  recordFileType: 'Money',
};

export const sampleWithPartialData: ICrbRecordFileType = {
  id: 84337,
  recordFileTypeCode: 'Front-line',
  recordFileType: 'Chips',
  recordFileTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbRecordFileType = {
  id: 18394,
  recordFileTypeCode: 'copying 24/7',
  recordFileType: 'Rustic Enterprise-wide',
  recordFileTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbRecordFileType = {
  recordFileTypeCode: 'connecting',
  recordFileType: 'Engineer Bedfordshire quantify',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
