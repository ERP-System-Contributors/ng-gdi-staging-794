import { genderTypes } from 'app/entities/enumerations/gender-types.model';

export interface IGenderType {
  id: number;
  genderCode?: string | null;
  genderType?: genderTypes | null;
  genderDescription?: string | null;
}

export type NewGenderType = Omit<IGenderType, 'id'> & { id: null };
