export interface IDerivativeUnderlyingAsset {
  id: number;
  derivativeUnderlyingAssetTypeCode?: string | null;
  financialDerivativeUnderlyingAssetType?: string | null;
  derivativeUnderlyingAssetTypeDetails?: string | null;
}

export type NewDerivativeUnderlyingAsset = Omit<IDerivativeUnderlyingAsset, 'id'> & { id: null };
