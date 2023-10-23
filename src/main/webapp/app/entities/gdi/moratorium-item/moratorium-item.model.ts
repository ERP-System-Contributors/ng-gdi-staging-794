export interface IMoratoriumItem {
  id: number;
  moratoriumItemTypeCode?: string | null;
  moratoriumItemType?: string | null;
  moratoriumTypeDetails?: string | null;
}

export type NewMoratoriumItem = Omit<IMoratoriumItem, 'id'> & { id: null };
