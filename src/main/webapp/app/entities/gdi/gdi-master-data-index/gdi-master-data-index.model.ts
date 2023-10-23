export interface IGdiMasterDataIndex {
  id: number;
  entityName?: string | null;
  databaseName?: string | null;
  businessDescription?: string | null;
}

export type NewGdiMasterDataIndex = Omit<IGdiMasterDataIndex, 'id'> & { id: null };
