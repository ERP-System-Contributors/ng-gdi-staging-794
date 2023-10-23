import { SubmittedFileStatusTypes } from 'app/entities/enumerations/submitted-file-status-types.model';

import { ICrbFileTransmissionStatus, NewCrbFileTransmissionStatus } from './crb-file-transmission-status.model';

export const sampleWithRequiredData: ICrbFileTransmissionStatus = {
  id: 34417,
  submittedFileStatusTypeCode: 'applications Solomon back',
  submittedFileStatusType: SubmittedFileStatusTypes['INCORRECT'],
};

export const sampleWithPartialData: ICrbFileTransmissionStatus = {
  id: 1263,
  submittedFileStatusTypeCode: 'web synthesize Riel',
  submittedFileStatusType: SubmittedFileStatusTypes['INCORRECT'],
  submittedFileStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbFileTransmissionStatus = {
  id: 32731,
  submittedFileStatusTypeCode: 'Security Books network',
  submittedFileStatusType: SubmittedFileStatusTypes['CORRECT'],
  submittedFileStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbFileTransmissionStatus = {
  submittedFileStatusTypeCode: 'demand-driven silver',
  submittedFileStatusType: SubmittedFileStatusTypes['CORRECT'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
