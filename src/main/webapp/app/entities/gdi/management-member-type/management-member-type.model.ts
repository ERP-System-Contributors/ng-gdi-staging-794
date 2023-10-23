export interface IManagementMemberType {
  id: number;
  managementMemberTypeCode?: string | null;
  managementMemberType?: string | null;
}

export type NewManagementMemberType = Omit<IManagementMemberType, 'id'> & { id: null };
