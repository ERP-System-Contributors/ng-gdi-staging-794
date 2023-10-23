import dayjs from 'dayjs/esm';
import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';

export interface IFiscalQuarter {
  id: number;
  quarterNumber?: number | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  fiscalQuarterCode?: string | null;
  fiscalYear?: Pick<IFiscalYear, 'id' | 'fiscalYearCode'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  universallyUniqueMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
}

export type NewFiscalQuarter = Omit<IFiscalQuarter, 'id'> & { id: null };
