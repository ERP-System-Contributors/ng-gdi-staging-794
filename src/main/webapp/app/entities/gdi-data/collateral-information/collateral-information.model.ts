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
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { ICollateralType } from 'app/entities/gdi/collateral-type/collateral-type.model';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CollateralInsuredFlagTypes } from 'app/entities/enumerations/collateral-insured-flag-types.model';

export interface ICollateralInformation {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  collateralId?: string | null;
  loanContractId?: string | null;
  customerId?: string | null;
  registrationPropertyNumber?: string | null;
  collateralOMVInCCY?: number | null;
  collateralFSVInLCY?: number | null;
  collateralDiscountedValue?: number | null;
  amountCharged?: number | null;
  collateralDiscountRate?: number | null;
  loanToValueRatio?: number | null;
  nameOfPropertyValuer?: string | null;
  collateralLastValuationDate?: dayjs.Dayjs | null;
  insuredFlag?: CollateralInsuredFlagTypes | null;
  nameOfInsurer?: string | null;
  amountInsured?: number | null;
  insuranceExpiryDate?: dayjs.Dayjs | null;
  guaranteeInsurers?: string | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchCode?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  collateralType?: Pick<ICollateralType, 'id' | 'collateralType'> | null;
  countyCode?: Pick<ICountySubCountyCode, 'id' | 'subCountyName'> | null;
}

export type NewCollateralInformation = Omit<ICollateralInformation, 'id'> & { id: null };
