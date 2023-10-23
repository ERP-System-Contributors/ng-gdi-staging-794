export interface IInstitutionStatusType {
  id: number;
  institutionStatusCode?: string | null;
  institutionStatusType?: string | null;
  insitutionStatusTypeDescription?: string | null;
}

export type NewInstitutionStatusType = Omit<IInstitutionStatusType, 'id'> & { id: null };
