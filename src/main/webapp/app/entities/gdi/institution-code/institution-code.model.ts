import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IInstitutionCode {
  id: number;
  institutionCode?: string | null;
  institutionName?: string | null;
  shortName?: string | null;
  category?: string | null;
  institutionCategory?: string | null;
  institutionOwnership?: string | null;
  dateLicensed?: dayjs.Dayjs | null;
  institutionStatus?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewInstitutionCode = Omit<IInstitutionCode, 'id'> & { id: null };
