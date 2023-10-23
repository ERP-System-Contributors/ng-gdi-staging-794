export interface ICustomerComplaintStatusType {
  id: number;
  customerComplaintStatusTypeCode?: string | null;
  customerComplaintStatusType?: string | null;
  customerComplaintStatusTypeDetails?: string | null;
}

export type NewCustomerComplaintStatusType = Omit<ICustomerComplaintStatusType, 'id'> & { id: null };
