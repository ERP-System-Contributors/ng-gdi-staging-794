import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IUniversallyUniqueMapping {
  id: number;
  universalKey?: string | null;
  mappedValue?: string | null;
  parentMapping?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewUniversallyUniqueMapping = Omit<IUniversallyUniqueMapping, 'id'> & { id: null };
