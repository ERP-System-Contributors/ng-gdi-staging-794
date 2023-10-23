export interface ICollateralType {
  id: number;
  collateralTypeCode?: string | null;
  collateralType?: string | null;
  collateralTypeDescription?: string | null;
}

export type NewCollateralType = Omit<ICollateralType, 'id'> & { id: null };
