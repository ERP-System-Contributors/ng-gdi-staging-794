export interface ILoanRestructureItem {
  id: number;
  loanRestructureItemCode?: string | null;
  loanRestructureItemType?: string | null;
  loanRestructureItemDetails?: string | null;
}

export type NewLoanRestructureItem = Omit<ILoanRestructureItem, 'id'> & { id: null };
