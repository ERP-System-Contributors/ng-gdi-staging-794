export interface IIsicEconomicActivity {
  id: number;
  businessEconomicActivityCode?: string | null;
  section?: string | null;
  sectionLabel?: string | null;
  division?: string | null;
  divisionLabel?: string | null;
  groupCode?: string | null;
  groupLabel?: string | null;
  classCode?: string | null;
  businessEconomicActivityType?: string | null;
  businessEconomicActivityTypeDescription?: string | null;
}

export type NewIsicEconomicActivity = Omit<IIsicEconomicActivity, 'id'> & { id: null };
