export interface ICrbReportRequestReasons {
  id: number;
  creditReportRequestReasonTypeCode?: string | null;
  creditReportRequestReasonType?: string | null;
  creditReportRequestDetails?: string | null;
}

export type NewCrbReportRequestReasons = Omit<ICrbReportRequestReasons, 'id'> & { id: null };
