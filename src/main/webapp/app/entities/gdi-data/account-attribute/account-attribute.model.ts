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
import { IAccountOwnershipType } from 'app/entities/gdi/account-ownership-type/account-ownership-type.model';

export interface IAccountAttribute {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  customerNumber?: string | null;
  accountContractNumber?: string | null;
  accountName?: string | null;
  accountOpeningDate?: dayjs.Dayjs | null;
  accountClosingDate?: dayjs.Dayjs | null;
  debitInterestRate?: number | null;
  creditInterestRate?: number | null;
  sanctionedAccountLimitFcy?: number | null;
  sanctionedAccountLimitLcy?: number | null;
  accountStatusChangeDate?: dayjs.Dayjs | null;
  expiryDate?: dayjs.Dayjs | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionCode'> | null;
  branchCode?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  accountOwnershipType?: Pick<IAccountOwnershipType, 'id' | 'accountOwnershipType'> | null;
}

export type NewAccountAttribute = Omit<IAccountAttribute, 'id'> & { id: null };
