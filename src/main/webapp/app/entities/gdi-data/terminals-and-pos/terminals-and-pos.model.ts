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
import { ITerminalTypes } from 'app/entities/gdi/terminal-types/terminal-types.model';
import { ITerminalFunctions } from 'app/entities/gdi/terminal-functions/terminal-functions.model';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';

export interface ITerminalsAndPOS {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  terminalId?: string | null;
  merchantId?: string | null;
  terminalName?: string | null;
  terminalLocation?: string | null;
  iso6709Latitute?: number | null;
  iso6709Longitude?: number | null;
  terminalOpeningDate?: dayjs.Dayjs | null;
  terminalClosureDate?: dayjs.Dayjs | null;
  terminalType?: Pick<ITerminalTypes, 'id' | 'txnTerminalTypeCode'> | null;
  terminalFunctionality?: Pick<ITerminalFunctions, 'id' | 'terminalFunctionality'> | null;
  physicalLocation?: Pick<ICountySubCountyCode, 'id' | 'subCountyCode'> | null;
  bankId?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchId?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
}

export type NewTerminalsAndPOS = Omit<ITerminalsAndPOS, 'id'> & { id: null };
