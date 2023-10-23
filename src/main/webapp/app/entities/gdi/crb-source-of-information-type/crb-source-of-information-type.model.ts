export interface ICrbSourceOfInformationType {
  id: number;
  sourceOfInformationTypeCode?: string | null;
  sourceOfInformationTypeDescription?: string | null;
}

export type NewCrbSourceOfInformationType = Omit<ICrbSourceOfInformationType, 'id'> & { id: null };
