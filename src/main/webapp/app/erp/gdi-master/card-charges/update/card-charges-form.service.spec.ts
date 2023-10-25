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

import { sampleWithRequiredData, sampleWithNewData } from '../card-charges.test-samples';

import { CardChargesFormService } from './card-charges-form.service';

describe('CardCharges Form Service', () => {
  let service: CardChargesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardChargesFormService);
  });

  describe('Service methods', () => {
    describe('createCardChargesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardChargesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardChargeType: expect.any(Object),
            cardChargeTypeName: expect.any(Object),
            cardChargeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardCharges should create a new form with FormGroup', () => {
        const formGroup = service.createCardChargesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardChargeType: expect.any(Object),
            cardChargeTypeName: expect.any(Object),
            cardChargeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardCharges', () => {
      it('should return NewCardCharges for default CardCharges initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardChargesFormGroup(sampleWithNewData);

        const cardCharges = service.getCardCharges(formGroup) as any;

        expect(cardCharges).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardCharges for empty CardCharges initial value', () => {
        const formGroup = service.createCardChargesFormGroup();

        const cardCharges = service.getCardCharges(formGroup) as any;

        expect(cardCharges).toMatchObject({});
      });

      it('should return ICardCharges', () => {
        const formGroup = service.createCardChargesFormGroup(sampleWithRequiredData);

        const cardCharges = service.getCardCharges(formGroup) as any;

        expect(cardCharges).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardCharges should not enable id FormControl', () => {
        const formGroup = service.createCardChargesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardCharges should disable id FormControl', () => {
        const formGroup = service.createCardChargesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
