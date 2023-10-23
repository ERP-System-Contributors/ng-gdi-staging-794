export interface ICrbNatureOfInformation {
  id: number;
  natureOfInformationTypeCode?: string | null;
  natureOfInformationType?: string | null;
  natureOfInformationTypeDescription?: string | null;
}

export type NewCrbNatureOfInformation = Omit<ICrbNatureOfInformation, 'id'> & { id: null };
