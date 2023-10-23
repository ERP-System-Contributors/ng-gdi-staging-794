export interface ICrbReportViewBand {
  id: number;
  reportViewCode?: string | null;
  reportViewCategory?: string | null;
  reportViewCategoryDescription?: string | null;
}

export type NewCrbReportViewBand = Omit<ICrbReportViewBand, 'id'> & { id: null };
