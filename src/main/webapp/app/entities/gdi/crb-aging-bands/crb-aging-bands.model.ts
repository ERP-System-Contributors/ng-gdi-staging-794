export interface ICrbAgingBands {
  id: number;
  agingBandCategoryCode?: string | null;
  agingBandCategory?: string | null;
  agingBandCategoryDetails?: string | null;
}

export type NewCrbAgingBands = Omit<ICrbAgingBands, 'id'> & { id: null };
