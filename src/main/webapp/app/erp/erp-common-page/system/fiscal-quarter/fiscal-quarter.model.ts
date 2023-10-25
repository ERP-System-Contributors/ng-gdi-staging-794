///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
