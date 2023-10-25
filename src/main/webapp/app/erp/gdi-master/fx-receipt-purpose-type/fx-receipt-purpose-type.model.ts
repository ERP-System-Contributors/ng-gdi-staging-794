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

export interface IFxReceiptPurposeType {
  id: number;
  itemCode?: string | null;
  attribute1ReceiptPaymentPurposeCode?: string | null;
  attribute1ReceiptPaymentPurposeType?: string | null;
  attribute2ReceiptPaymentPurposeCode?: string | null;
  attribute2ReceiptPaymentPurposeDescription?: string | null;
  attribute3ReceiptPaymentPurposeCode?: string | null;
  attribute3ReceiptPaymentPurposeDescription?: string | null;
  attribute4ReceiptPaymentPurposeCode?: string | null;
  attribute4ReceiptPaymentPurposeDescription?: string | null;
  attribute5ReceiptPaymentPurposeCode?: string | null;
  attribute5ReceiptPaymentPurposeDescription?: string | null;
  lastChild?: string | null;
}

export type NewFxReceiptPurposeType = Omit<IFxReceiptPurposeType, 'id'> & { id: null };
