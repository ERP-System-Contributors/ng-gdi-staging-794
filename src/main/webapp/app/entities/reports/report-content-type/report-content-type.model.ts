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

import { ISystemContentType } from 'app/entities/system/system-content-type/system-content-type.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IReportContentType {
  id: number;
  reportTypeName?: string | null;
  reportFileExtension?: string | null;
  systemContentType?: Pick<ISystemContentType, 'id' | 'contentTypeName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewReportContentType = Omit<IReportContentType, 'id'> & { id: null };
