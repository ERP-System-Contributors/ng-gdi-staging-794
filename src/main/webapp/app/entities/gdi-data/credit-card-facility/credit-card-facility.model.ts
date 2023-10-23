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
import { ICreditCardOwnership } from 'app/entities/gdi/credit-card-ownership/credit-card-ownership.model';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';

export interface ICreditCardFacility {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  totalNumberOfActiveCreditCards?: number | null;
  totalCreditCardLimitsInCCY?: number | null;
  totalCreditCardLimitsInLCY?: number | null;
  totalCreditCardAmountUtilisedInCCY?: number | null;
  totalCreditCardAmountUtilisedInLcy?: number | null;
  totalNPACreditCardAmountInFCY?: number | null;
  totalNPACreditCardAmountInLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  customerCategory?: Pick<ICreditCardOwnership, 'id' | 'creditCardOwnershipCategoryType'> | null;
  currencyCode?: Pick<IIsoCurrencyCode, 'id' | 'alphabeticCode'> | null;
}

export type NewCreditCardFacility = Omit<ICreditCardFacility, 'id'> & { id: null };
