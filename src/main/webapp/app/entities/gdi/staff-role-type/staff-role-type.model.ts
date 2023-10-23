export interface IStaffRoleType {
  id: number;
  staffRoleTypeCode?: string | null;
  staffRoleType?: string | null;
  staffRoleTypeDetails?: string | null;
}

export type NewStaffRoleType = Omit<IStaffRoleType, 'id'> & { id: null };
