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

import { sampleWithRequiredData, sampleWithNewData } from '../card-class-type.test-samples';

import { CardClassTypeFormService } from './card-class-type-form.service';

describe('CardClassType Form Service', () => {
  let service: CardClassTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardClassTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCardClassTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardClassTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardClassTypeCode: expect.any(Object),
            cardClassType: expect.any(Object),
            cardClassDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardClassType should create a new form with FormGroup', () => {
        const formGroup = service.createCardClassTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardClassTypeCode: expect.any(Object),
            cardClassType: expect.any(Object),
            cardClassDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardClassType', () => {
      it('should return NewCardClassType for default CardClassType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardClassTypeFormGroup(sampleWithNewData);

        const cardClassType = service.getCardClassType(formGroup) as any;

        expect(cardClassType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardClassType for empty CardClassType initial value', () => {
        const formGroup = service.createCardClassTypeFormGroup();

        const cardClassType = service.getCardClassType(formGroup) as any;

        expect(cardClassType).toMatchObject({});
      });

      it('should return ICardClassType', () => {
        const formGroup = service.createCardClassTypeFormGroup(sampleWithRequiredData);

        const cardClassType = service.getCardClassType(formGroup) as any;

        expect(cardClassType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardClassType should not enable id FormControl', () => {
        const formGroup = service.createCardClassTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardClassType should disable id FormControl', () => {
        const formGroup = service.createCardClassTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
