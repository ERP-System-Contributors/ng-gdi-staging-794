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

import { IFxReceiptPurposeType, NewFxReceiptPurposeType } from './fx-receipt-purpose-type.model';

export const sampleWithRequiredData: IFxReceiptPurposeType = {
  id: 95430,
  itemCode: 'Michigan partnerships',
};

export const sampleWithPartialData: IFxReceiptPurposeType = {
  id: 76641,
  itemCode: 'Falls',
  attribute1ReceiptPaymentPurposeCode: 'gold',
  attribute2ReceiptPaymentPurposeCode: 'Intranet interface time-frame',
  attribute4ReceiptPaymentPurposeCode: 'clicks-and-mortar',
  attribute4ReceiptPaymentPurposeDescription: 'Western',
};

export const sampleWithFullData: IFxReceiptPurposeType = {
  id: 76152,
  itemCode: 'redundant',
  attribute1ReceiptPaymentPurposeCode: 'Auto Managed',
  attribute1ReceiptPaymentPurposeType: 'card mesh',
  attribute2ReceiptPaymentPurposeCode: 'Ergonomic Drives TCP',
  attribute2ReceiptPaymentPurposeDescription: 'Toys bandwidth Creative',
  attribute3ReceiptPaymentPurposeCode: 'Springs',
  attribute3ReceiptPaymentPurposeDescription: 'Planner driver',
  attribute4ReceiptPaymentPurposeCode: 'Clothing deposit orchid',
  attribute4ReceiptPaymentPurposeDescription: 'exuding',
  attribute5ReceiptPaymentPurposeCode: 'Electronics Orchestrator',
  attribute5ReceiptPaymentPurposeDescription: 'Engineer Bedfordshire deposit',
  lastChild: 'visualize',
};

export const sampleWithNewData: NewFxReceiptPurposeType = {
  itemCode: 'Designer International Sausages',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
