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

import { sampleWithRequiredData, sampleWithNewData } from '../bounced-cheque-categories.test-samples';

import { BouncedChequeCategoriesFormService } from './bounced-cheque-categories-form.service';

describe('BouncedChequeCategories Form Service', () => {
  let service: BouncedChequeCategoriesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouncedChequeCategoriesFormService);
  });

  describe('Service methods', () => {
    describe('createBouncedChequeCategoriesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bouncedChequeCategoryTypeCode: expect.any(Object),
            bouncedChequeCategoryType: expect.any(Object),
          })
        );
      });

      it('passing IBouncedChequeCategories should create a new form with FormGroup', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bouncedChequeCategoryTypeCode: expect.any(Object),
            bouncedChequeCategoryType: expect.any(Object),
          })
        );
      });
    });

    describe('getBouncedChequeCategories', () => {
      it('should return NewBouncedChequeCategories for default BouncedChequeCategories initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithNewData);

        const bouncedChequeCategories = service.getBouncedChequeCategories(formGroup) as any;

        expect(bouncedChequeCategories).toMatchObject(sampleWithNewData);
      });

      it('should return NewBouncedChequeCategories for empty BouncedChequeCategories initial value', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup();

        const bouncedChequeCategories = service.getBouncedChequeCategories(formGroup) as any;

        expect(bouncedChequeCategories).toMatchObject({});
      });

      it('should return IBouncedChequeCategories', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithRequiredData);

        const bouncedChequeCategories = service.getBouncedChequeCategories(formGroup) as any;

        expect(bouncedChequeCategories).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBouncedChequeCategories should not enable id FormControl', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBouncedChequeCategories should disable id FormControl', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
