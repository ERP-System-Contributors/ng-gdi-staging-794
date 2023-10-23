import dayjs from 'dayjs/esm';
import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { IFiscalQuarter } from 'app/entities/system/fiscal-quarter/fiscal-quarter.model';

export interface IFiscalMonth {
  id: number;
  monthNumber?: number | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  fiscalMonthCode?: string | null;
  fiscalYear?: Pick<IFiscalYear, 'id' | 'fiscalYearCode'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  universallyUniqueMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  fiscalQuarter?: Pick<IFiscalQuarter, 'id' | 'fiscalQuarterCode'> | null;
}

export type NewFiscalMonth = Omit<IFiscalMonth, 'id'> & { id: null };
