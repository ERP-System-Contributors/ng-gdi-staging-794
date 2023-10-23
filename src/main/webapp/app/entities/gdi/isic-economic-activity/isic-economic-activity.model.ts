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

export interface IIsicEconomicActivity {
  id: number;
  businessEconomicActivityCode?: string | null;
  section?: string | null;
  sectionLabel?: string | null;
  division?: string | null;
  divisionLabel?: string | null;
  groupCode?: string | null;
  groupLabel?: string | null;
  classCode?: string | null;
  businessEconomicActivityType?: string | null;
  businessEconomicActivityTypeDescription?: string | null;
}

export type NewIsicEconomicActivity = Omit<IIsicEconomicActivity, 'id'> & { id: null };
