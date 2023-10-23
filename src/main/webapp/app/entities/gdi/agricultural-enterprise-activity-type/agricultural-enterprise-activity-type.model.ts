export interface IAgriculturalEnterpriseActivityType {
  id: number;
  agriculturalEnterpriseActivityTypeCode?: string | null;
  agriculturalEnterpriseActivityType?: string | null;
  agriculturalEnterpriseActivityTypeDescription?: string | null;
}

export type NewAgriculturalEnterpriseActivityType = Omit<IAgriculturalEnterpriseActivityType, 'id'> & { id: null };
