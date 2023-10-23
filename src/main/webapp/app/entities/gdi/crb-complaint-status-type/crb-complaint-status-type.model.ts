export interface ICrbComplaintStatusType {
  id: number;
  complaintStatusTypeCode?: string | null;
  complaintStatusType?: string | null;
  complaintStatusDetails?: string | null;
}

export type NewCrbComplaintStatusType = Omit<ICrbComplaintStatusType, 'id'> & { id: null };
