export interface IBusinessSegmentTypes {
  id: number;
  businessEconomicSegmentCode?: string | null;
  businessEconomicSegment?: string | null;
  details?: string | null;
}

export type NewBusinessSegmentTypes = Omit<IBusinessSegmentTypes, 'id'> & { id: null };
