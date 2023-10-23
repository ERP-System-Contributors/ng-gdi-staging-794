export interface IInstitutionContactDetails {
  id: number;
  entityId?: string | null;
  entityName?: string | null;
  contactType?: string | null;
  contactLevel?: string | null;
  contactValue?: string | null;
  contactName?: string | null;
  contactDesignation?: string | null;
}

export type NewInstitutionContactDetails = Omit<IInstitutionContactDetails, 'id'> & { id: null };
