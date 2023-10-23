export interface IMerchantType {
  id: number;
  merchantTypeCode?: string | null;
  merchantType?: string | null;
  merchantTypeDetails?: string | null;
}

export type NewMerchantType = Omit<IMerchantType, 'id'> & { id: null };
