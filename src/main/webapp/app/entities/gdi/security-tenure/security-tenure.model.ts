export interface ISecurityTenure {
  id: number;
  securityTenureCode?: string | null;
  securityTenureType?: string | null;
  securityTenureDetails?: string | null;
}

export type NewSecurityTenure = Omit<ISecurityTenure, 'id'> & { id: null };
