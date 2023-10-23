import { SubmittedFileStatusTypes } from 'app/entities/enumerations/submitted-file-status-types.model';

export interface ICrbFileTransmissionStatus {
  id: number;
  submittedFileStatusTypeCode?: string | null;
  submittedFileStatusType?: SubmittedFileStatusTypes | null;
  submittedFileStatusTypeDescription?: string | null;
}

export type NewCrbFileTransmissionStatus = Omit<ICrbFileTransmissionStatus, 'id'> & { id: null };
