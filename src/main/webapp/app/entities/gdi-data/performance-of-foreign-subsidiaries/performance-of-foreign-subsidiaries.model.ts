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
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IIsoCountryCode } from 'app/entities/gdi/iso-country-code/iso-country-code.model';

export interface IPerformanceOfForeignSubsidiaries {
  id: number;
  subsidiaryName?: string | null;
  reportingDate?: dayjs.Dayjs | null;
  subsidiaryId?: string | null;
  grossLoansAmount?: number | null;
  grossNPALoanAmount?: number | null;
  grossAssetsAmount?: number | null;
  grossDepositsAmount?: number | null;
  profitBeforeTax?: number | null;
  totalCapitalAdequacyRatio?: number | null;
  liquidityRatio?: number | null;
  generalProvisions?: number | null;
  specificProvisions?: number | null;
  interestInSuspenseAmount?: number | null;
  totalNumberOfStaff?: number | null;
  numberOfBranches?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  subsidiaryCountryCode?: Pick<IIsoCountryCode, 'id' | 'countryDescription'> | null;
}

export type NewPerformanceOfForeignSubsidiaries = Omit<IPerformanceOfForeignSubsidiaries, 'id'> & { id: null };
