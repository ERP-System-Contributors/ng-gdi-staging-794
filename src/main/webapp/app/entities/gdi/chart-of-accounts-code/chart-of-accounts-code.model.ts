export interface IChartOfAccountsCode {
  id: number;
  chartOfAccountsCode?: string | null;
  chartOfAccountsClass?: string | null;
  description?: string | null;
}

export type NewChartOfAccountsCode = Omit<IChartOfAccountsCode, 'id'> & { id: null };
