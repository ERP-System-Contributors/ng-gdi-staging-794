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
import { ICardTypes } from 'app/entities/gdi/card-types/card-types.model';
import { ICardBrandType } from 'app/entities/gdi/card-brand-type/card-brand-type.model';
import { ICardCategoryType } from 'app/entities/gdi/card-category-type/card-category-type.model';
import { IBankTransactionType } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.model';
import { IChannelType } from 'app/entities/gdi/channel-type/channel-type.model';
import { ICardState } from 'app/entities/gdi-data/card-state/card-state.model';

export interface ICardUsageInformation {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  totalNumberOfLiveCards?: number | null;
  totalActiveCards?: number | null;
  totalNumberOfTransactionsDone?: number | null;
  totalValueOfTransactionsDoneInLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  cardType?: Pick<ICardTypes, 'id' | 'cardType'> | null;
  cardBrand?: Pick<ICardBrandType, 'id' | 'cardBrandType'> | null;
  cardCategoryType?: Pick<ICardCategoryType, 'id' | 'cardCategoryDescription'> | null;
  transactionType?: Pick<IBankTransactionType, 'id' | 'transactionTypeDetails'> | null;
  channelType?: Pick<IChannelType, 'id' | 'channelTypes'> | null;
  cardState?: Pick<ICardState, 'id' | 'cardStateFlagDetails'> | null;
}

export type NewCardUsageInformation = Omit<ICardUsageInformation, 'id'> & { id: null };
