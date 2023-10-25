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

import { ICounterPartyDealType, NewCounterPartyDealType } from './counter-party-deal-type.model';

export const sampleWithRequiredData: ICounterPartyDealType = {
  id: 10842,
  counterpartyDealCode: 'Bridge web ability',
  counterpartyDealTypeDetails: 'Books haptic Gardens',
};

export const sampleWithPartialData: ICounterPartyDealType = {
  id: 9009,
  counterpartyDealCode: 'Corporate Salad International',
  counterpartyDealTypeDetails: 'Savings Maryland',
  counterpartyDealTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICounterPartyDealType = {
  id: 38626,
  counterpartyDealCode: 'De-engineered complexity',
  counterpartyDealTypeDetails: 'Cotton systems',
  counterpartyDealTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCounterPartyDealType = {
  counterpartyDealCode: 'magenta quantify',
  counterpartyDealTypeDetails: 'copy killer',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
