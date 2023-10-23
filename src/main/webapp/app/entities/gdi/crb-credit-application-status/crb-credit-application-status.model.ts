export interface ICrbCreditApplicationStatus {
  id: number;
  crbCreditApplicationStatusTypeCode?: string | null;
  crbCreditApplicationStatusType?: string | null;
  crbCreditApplicationStatusDetails?: string | null;
}

export type NewCrbCreditApplicationStatus = Omit<ICrbCreditApplicationStatus, 'id'> & { id: null };
