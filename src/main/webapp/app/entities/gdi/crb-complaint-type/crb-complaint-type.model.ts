export interface ICrbComplaintType {
  id: number;
  complaintTypeCode?: string | null;
  complaintType?: string | null;
  complaintTypeDetails?: string | null;
}

export type NewCrbComplaintType = Omit<ICrbComplaintType, 'id'> & { id: null };
