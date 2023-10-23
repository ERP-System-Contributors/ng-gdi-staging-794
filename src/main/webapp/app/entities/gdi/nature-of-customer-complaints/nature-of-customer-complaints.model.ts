export interface INatureOfCustomerComplaints {
  id: number;
  natureOfComplaintTypeCode?: string | null;
  natureOfComplaintType?: string | null;
  natureOfComplaintTypeDetails?: string | null;
}

export type NewNatureOfCustomerComplaints = Omit<INatureOfCustomerComplaints, 'id'> & { id: null };
