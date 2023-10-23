export interface ISecurityType {
  id: number;
  securityTypeCode?: string | null;
  securityType?: string | null;
  securityTypeDetails?: string | null;
  securityTypeDescription?: string | null;
}

export type NewSecurityType = Omit<ISecurityType, 'id'> & { id: null };
