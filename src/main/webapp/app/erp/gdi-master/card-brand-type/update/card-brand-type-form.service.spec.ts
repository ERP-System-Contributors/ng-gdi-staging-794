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

import { sampleWithRequiredData, sampleWithNewData } from '../card-brand-type.test-samples';

import { CardBrandTypeFormService } from './card-brand-type-form.service';

describe('CardBrandType Form Service', () => {
  let service: CardBrandTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardBrandTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCardBrandTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardBrandTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardBrandTypeCode: expect.any(Object),
            cardBrandType: expect.any(Object),
            cardBrandTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardBrandType should create a new form with FormGroup', () => {
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardBrandTypeCode: expect.any(Object),
            cardBrandType: expect.any(Object),
            cardBrandTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardBrandType', () => {
      it('should return NewCardBrandType for default CardBrandType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithNewData);

        const cardBrandType = service.getCardBrandType(formGroup) as any;

        expect(cardBrandType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardBrandType for empty CardBrandType initial value', () => {
        const formGroup = service.createCardBrandTypeFormGroup();

        const cardBrandType = service.getCardBrandType(formGroup) as any;

        expect(cardBrandType).toMatchObject({});
      });

      it('should return ICardBrandType', () => {
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithRequiredData);

        const cardBrandType = service.getCardBrandType(formGroup) as any;

        expect(cardBrandType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardBrandType should not enable id FormControl', () => {
        const formGroup = service.createCardBrandTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardBrandType should disable id FormControl', () => {
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
