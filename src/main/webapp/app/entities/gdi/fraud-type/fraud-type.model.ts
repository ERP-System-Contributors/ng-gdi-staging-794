export interface IFraudType {
  id: number;
  fraudTypeCode?: string | null;
  fraudType?: string | null;
  fraudTypeDetails?: string | null;
}

export type NewFraudType = Omit<IFraudType, 'id'> & { id: null };
