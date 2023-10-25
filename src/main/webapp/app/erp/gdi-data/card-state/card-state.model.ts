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

import { CardStateFlagTypes } from 'app/entities/enumerations/card-state-flag-types.model';

export interface ICardState {
  id: number;
  cardStateFlag?: CardStateFlagTypes | null;
  cardStateFlagDetails?: string | null;
  cardStateFlagDescription?: string | null;
}

export type NewCardState = Omit<ICardState, 'id'> & { id: null };
