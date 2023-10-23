export interface ICrbAccountHolderType {
  id: number;
  accountHolderCategoryTypeCode?: string | null;
  accountHolderCategoryType?: string | null;
}

export type NewCrbAccountHolderType = Omit<ICrbAccountHolderType, 'id'> & { id: null };
