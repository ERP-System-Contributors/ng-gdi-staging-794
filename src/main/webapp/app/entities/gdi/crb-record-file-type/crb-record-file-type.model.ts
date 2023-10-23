export interface ICrbRecordFileType {
  id: number;
  recordFileTypeCode?: string | null;
  recordFileType?: string | null;
  recordFileTypeDetails?: string | null;
}

export type NewCrbRecordFileType = Omit<ICrbRecordFileType, 'id'> & { id: null };
