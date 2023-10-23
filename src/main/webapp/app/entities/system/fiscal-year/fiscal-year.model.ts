import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { FiscalYearStatusType } from 'app/entities/enumerations/fiscal-year-status-type.model';

export interface IFiscalYear {
  id: number;
  fiscalYearCode?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  fiscalYearStatus?: FiscalYearStatusType | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  universallyUniqueMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  createdBy?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  lastUpdatedBy?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
}

export type NewFiscalYear = Omit<IFiscalYear, 'id'> & { id: null };
