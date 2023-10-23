export interface ICrbAccountStatus {
  id: number;
  accountStatusTypeCode?: string | null;
  accountStatusType?: string | null;
  accountStatusTypeDetails?: string | null;
}

export type NewCrbAccountStatus = Omit<ICrbAccountStatus, 'id'> & { id: null };
