export interface IAnticipatedMaturityPeriood {
  id: number;
  anticipatedMaturityTenorCode?: string | null;
  aniticipatedMaturityTenorType?: string | null;
  anticipatedMaturityTenorDetails?: string | null;
}

export type NewAnticipatedMaturityPeriood = Omit<IAnticipatedMaturityPeriood, 'id'> & { id: null };
