///
/// Erp System - Mark II No 20 (Baruch Series)
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import * as dayjs from 'dayjs';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { AgencyStatusType } from 'app/entities/enumerations/agency-status-type.model';

export interface IAgencyNotice {
  id?: number;
  referenceNumber?: string;
  referenceDate?: dayjs.Dayjs | null;
  assessmentAmount?: number;
  agencyStatus?: AgencyStatusType;
  assessmentNoticeContentType?: string | null;
  assessmentNotice?: string | null;
  correspondents?: IDealer[] | null;
  settlementCurrency?: ISettlementCurrency | null;
  assessor?: IDealer | null;
  placeholders?: IPlaceholder[] | null;
}

export class AgencyNotice implements IAgencyNotice {
  constructor(
    public id?: number,
    public referenceNumber?: string,
    public referenceDate?: dayjs.Dayjs | null,
    public assessmentAmount?: number,
    public agencyStatus?: AgencyStatusType,
    public assessmentNoticeContentType?: string | null,
    public assessmentNotice?: string | null,
    public correspondents?: IDealer[] | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public assessor?: IDealer | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getAgencyNoticeIdentifier(agencyNotice: IAgencyNotice): number | undefined {
  return agencyNotice.id;
}
