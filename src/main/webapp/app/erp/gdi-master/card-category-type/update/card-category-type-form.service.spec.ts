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

import { sampleWithRequiredData, sampleWithNewData } from '../card-category-type.test-samples';

import { CardCategoryTypeFormService } from './card-category-type-form.service';

describe('CardCategoryType Form Service', () => {
  let service: CardCategoryTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCategoryTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCardCategoryTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardCategoryTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardCategoryFlag: expect.any(Object),
            cardCategoryDescription: expect.any(Object),
            cardCategoryDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardCategoryType should create a new form with FormGroup', () => {
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardCategoryFlag: expect.any(Object),
            cardCategoryDescription: expect.any(Object),
            cardCategoryDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardCategoryType', () => {
      it('should return NewCardCategoryType for default CardCategoryType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithNewData);

        const cardCategoryType = service.getCardCategoryType(formGroup) as any;

        expect(cardCategoryType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardCategoryType for empty CardCategoryType initial value', () => {
        const formGroup = service.createCardCategoryTypeFormGroup();

        const cardCategoryType = service.getCardCategoryType(formGroup) as any;

        expect(cardCategoryType).toMatchObject({});
      });

      it('should return ICardCategoryType', () => {
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithRequiredData);

        const cardCategoryType = service.getCardCategoryType(formGroup) as any;

        expect(cardCategoryType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardCategoryType should not enable id FormControl', () => {
        const formGroup = service.createCardCategoryTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardCategoryType should disable id FormControl', () => {
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
