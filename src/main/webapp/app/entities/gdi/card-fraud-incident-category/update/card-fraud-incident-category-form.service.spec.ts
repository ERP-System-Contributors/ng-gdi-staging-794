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

import { sampleWithRequiredData, sampleWithNewData } from '../card-fraud-incident-category.test-samples';

import { CardFraudIncidentCategoryFormService } from './card-fraud-incident-category-form.service';

describe('CardFraudIncidentCategory Form Service', () => {
  let service: CardFraudIncidentCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFraudIncidentCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCardFraudIncidentCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardFraudIncidentCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardFraudCategoryTypeCode: expect.any(Object),
            cardFraudCategoryType: expect.any(Object),
            cardFraudCategoryTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICardFraudIncidentCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCardFraudIncidentCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardFraudCategoryTypeCode: expect.any(Object),
            cardFraudCategoryType: expect.any(Object),
            cardFraudCategoryTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCardFraudIncidentCategory', () => {
      it('should return NewCardFraudIncidentCategory for default CardFraudIncidentCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardFraudIncidentCategoryFormGroup(sampleWithNewData);

        const cardFraudIncidentCategory = service.getCardFraudIncidentCategory(formGroup) as any;

        expect(cardFraudIncidentCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardFraudIncidentCategory for empty CardFraudIncidentCategory initial value', () => {
        const formGroup = service.createCardFraudIncidentCategoryFormGroup();

        const cardFraudIncidentCategory = service.getCardFraudIncidentCategory(formGroup) as any;

        expect(cardFraudIncidentCategory).toMatchObject({});
      });

      it('should return ICardFraudIncidentCategory', () => {
        const formGroup = service.createCardFraudIncidentCategoryFormGroup(sampleWithRequiredData);

        const cardFraudIncidentCategory = service.getCardFraudIncidentCategory(formGroup) as any;

        expect(cardFraudIncidentCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardFraudIncidentCategory should not enable id FormControl', () => {
        const formGroup = service.createCardFraudIncidentCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardFraudIncidentCategory should disable id FormControl', () => {
        const formGroup = service.createCardFraudIncidentCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
