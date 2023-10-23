export interface ILegalStatus {
  id: number;
  legalStatusCode?: string | null;
  legalStatusType?: string | null;
  legalStatusDescription?: string | null;
}

export type NewLegalStatus = Omit<ILegalStatus, 'id'> & { id: null };
