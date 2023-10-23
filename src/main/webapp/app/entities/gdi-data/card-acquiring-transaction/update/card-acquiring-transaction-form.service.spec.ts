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

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-acquiring-transaction.test-samples';

import { CardAcquiringTransactionFormService } from './card-acquiring-transaction-form.service';

describe('CardAcquiringTransaction Form Service', () => {
  let service: CardAcquiringTransactionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardAcquiringTransactionFormService);
  });

  describe('Service methods', () => {
    describe('createCardAcquiringTransactionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardAcquiringTransactionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            terminalId: expect.any(Object),
            numberOfTransactions: expect.any(Object),
            valueOfTransactionsInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            channelType: expect.any(Object),
            cardBrandType: expect.any(Object),
            currencyOfTransaction: expect.any(Object),
            cardIssuerCategory: expect.any(Object),
          })
        );
      });

      it('passing ICardAcquiringTransaction should create a new form with FormGroup', () => {
        const formGroup = service.createCardAcquiringTransactionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            terminalId: expect.any(Object),
            numberOfTransactions: expect.any(Object),
            valueOfTransactionsInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            channelType: expect.any(Object),
            cardBrandType: expect.any(Object),
            currencyOfTransaction: expect.any(Object),
            cardIssuerCategory: expect.any(Object),
          })
        );
      });
    });

    describe('getCardAcquiringTransaction', () => {
      it('should return NewCardAcquiringTransaction for default CardAcquiringTransaction initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardAcquiringTransactionFormGroup(sampleWithNewData);

        const cardAcquiringTransaction = service.getCardAcquiringTransaction(formGroup) as any;

        expect(cardAcquiringTransaction).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardAcquiringTransaction for empty CardAcquiringTransaction initial value', () => {
        const formGroup = service.createCardAcquiringTransactionFormGroup();

        const cardAcquiringTransaction = service.getCardAcquiringTransaction(formGroup) as any;

        expect(cardAcquiringTransaction).toMatchObject({});
      });

      it('should return ICardAcquiringTransaction', () => {
        const formGroup = service.createCardAcquiringTransactionFormGroup(sampleWithRequiredData);

        const cardAcquiringTransaction = service.getCardAcquiringTransaction(formGroup) as any;

        expect(cardAcquiringTransaction).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardAcquiringTransaction should not enable id FormControl', () => {
        const formGroup = service.createCardAcquiringTransactionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardAcquiringTransaction should disable id FormControl', () => {
        const formGroup = service.createCardAcquiringTransactionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
