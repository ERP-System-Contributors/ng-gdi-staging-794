export interface IBouncedChequeCategories {
  id: number;
  bouncedChequeCategoryTypeCode?: string | null;
  bouncedChequeCategoryType?: string | null;
}

export type NewBouncedChequeCategories = Omit<IBouncedChequeCategories, 'id'> & { id: null };
