export interface ICrbSubscriptionStatusTypeCode {
  id: number;
  subscriptionStatusTypeCode?: string | null;
  subscriptionStatusType?: string | null;
  subscriptionStatusTypeDescription?: string | null;
}

export type NewCrbSubscriptionStatusTypeCode = Omit<ICrbSubscriptionStatusTypeCode, 'id'> & { id: null };
