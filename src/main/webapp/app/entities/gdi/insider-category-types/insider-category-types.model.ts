export interface IInsiderCategoryTypes {
  id: number;
  insiderCategoryTypeCode?: string | null;
  insiderCategoryTypeDetail?: string | null;
  insiderCategoryDescription?: string | null;
}

export type NewInsiderCategoryTypes = Omit<IInsiderCategoryTypes, 'id'> & { id: null };
