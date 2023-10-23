export interface IStaffCurrentEmploymentStatus {
  id: number;
  staffCurrentEmploymentStatusTypeCode?: string | null;
  staffCurrentEmploymentStatusType?: string | null;
  staffCurrentEmploymentStatusTypeDetails?: string | null;
}

export type NewStaffCurrentEmploymentStatus = Omit<IStaffCurrentEmploymentStatus, 'id'> & { id: null };
