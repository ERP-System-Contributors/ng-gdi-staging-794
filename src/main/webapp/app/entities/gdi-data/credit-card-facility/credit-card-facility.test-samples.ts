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

import { ICreditCardFacility, NewCreditCardFacility } from './credit-card-facility.model';

export const sampleWithRequiredData: ICreditCardFacility = {
  id: 28341,
  reportingDate: dayjs('2023-10-03'),
  totalNumberOfActiveCreditCards: 64622,
  totalCreditCardLimitsInCCY: 94977,
  totalCreditCardLimitsInLCY: 78719,
  totalCreditCardAmountUtilisedInCCY: 85046,
  totalCreditCardAmountUtilisedInLcy: 71046,
  totalNPACreditCardAmountInFCY: 69125,
  totalNPACreditCardAmountInLCY: 98180,
};

export const sampleWithPartialData: ICreditCardFacility = {
  id: 46681,
  reportingDate: dayjs('2023-10-03'),
  totalNumberOfActiveCreditCards: 76069,
  totalCreditCardLimitsInCCY: 38005,
  totalCreditCardLimitsInLCY: 1502,
  totalCreditCardAmountUtilisedInCCY: 95832,
  totalCreditCardAmountUtilisedInLcy: 57342,
  totalNPACreditCardAmountInFCY: 4065,
  totalNPACreditCardAmountInLCY: 16267,
};

export const sampleWithFullData: ICreditCardFacility = {
  id: 68635,
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfActiveCreditCards: 1607,
  totalCreditCardLimitsInCCY: 55731,
  totalCreditCardLimitsInLCY: 98237,
  totalCreditCardAmountUtilisedInCCY: 68806,
  totalCreditCardAmountUtilisedInLcy: 68426,
  totalNPACreditCardAmountInFCY: 91350,
  totalNPACreditCardAmountInLCY: 44542,
};

export const sampleWithNewData: NewCreditCardFacility = {
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfActiveCreditCards: 59050,
  totalCreditCardLimitsInCCY: 67266,
  totalCreditCardLimitsInLCY: 19382,
  totalCreditCardAmountUtilisedInCCY: 82421,
  totalCreditCardAmountUtilisedInLcy: 68953,
  totalNPACreditCardAmountInFCY: 90124,
  totalNPACreditCardAmountInLCY: 52237,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
