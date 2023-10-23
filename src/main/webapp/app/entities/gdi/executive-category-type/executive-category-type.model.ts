export interface IExecutiveCategoryType {
  id: number;
  directorCategoryTypeCode?: string | null;
  directorCategoryType?: string | null;
  directorCategoryTypeDetails?: string | null;
}

export type NewExecutiveCategoryType = Omit<IExecutiveCategoryType, 'id'> & { id: null };
