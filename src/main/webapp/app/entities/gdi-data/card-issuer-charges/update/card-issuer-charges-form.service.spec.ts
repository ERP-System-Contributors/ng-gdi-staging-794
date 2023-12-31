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

import { sampleWithRequiredData, sampleWithNewData } from '../card-issuer-charges.test-samples';

import { CardIssuerChargesFormService } from './card-issuer-charges-form.service';

describe('CardIssuerCharges Form Service', () => {
  let service: CardIssuerChargesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardIssuerChargesFormService);
  });

  describe('Service methods', () => {
    describe('createCardIssuerChargesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardIssuerChargesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            cardFeeChargeInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            cardCategory: expect.any(Object),
            cardType: expect.any(Object),
            cardBrand: expect.any(Object),
            cardClass: expect.any(Object),
            cardChargeType: expect.any(Object),
          })
        );
      });

      it('passing ICardIssuerCharges should create a new form with FormGroup', () => {
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            cardFeeChargeInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            cardCategory: expect.any(Object),
            cardType: expect.any(Object),
            cardBrand: expect.any(Object),
            cardClass: expect.any(Object),
            cardChargeType: expect.any(Object),
          })
        );
      });
    });

    describe('getCardIssuerCharges', () => {
      it('should return NewCardIssuerCharges for default CardIssuerCharges initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithNewData);

        const cardIssuerCharges = service.getCardIssuerCharges(formGroup) as any;

        expect(cardIssuerCharges).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardIssuerCharges for empty CardIssuerCharges initial value', () => {
        const formGroup = service.createCardIssuerChargesFormGroup();

        const cardIssuerCharges = service.getCardIssuerCharges(formGroup) as any;

        expect(cardIssuerCharges).toMatchObject({});
      });

      it('should return ICardIssuerCharges', () => {
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithRequiredData);

        const cardIssuerCharges = service.getCardIssuerCharges(formGroup) as any;

        expect(cardIssuerCharges).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardIssuerCharges should not enable id FormControl', () => {
        const formGroup = service.createCardIssuerChargesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardIssuerCharges should disable id FormControl', () => {
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
