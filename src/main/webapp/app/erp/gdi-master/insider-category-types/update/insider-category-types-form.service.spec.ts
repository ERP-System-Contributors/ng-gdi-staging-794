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

import { sampleWithRequiredData, sampleWithNewData } from '../insider-category-types.test-samples';

import { InsiderCategoryTypesFormService } from './insider-category-types-form.service';

describe('InsiderCategoryTypes Form Service', () => {
  let service: InsiderCategoryTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsiderCategoryTypesFormService);
  });

  describe('Service methods', () => {
    describe('createInsiderCategoryTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            insiderCategoryTypeCode: expect.any(Object),
            insiderCategoryTypeDetail: expect.any(Object),
            insiderCategoryDescription: expect.any(Object),
          })
        );
      });

      it('passing IInsiderCategoryTypes should create a new form with FormGroup', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            insiderCategoryTypeCode: expect.any(Object),
            insiderCategoryTypeDetail: expect.any(Object),
            insiderCategoryDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getInsiderCategoryTypes', () => {
      it('should return NewInsiderCategoryTypes for default InsiderCategoryTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithNewData);

        const insiderCategoryTypes = service.getInsiderCategoryTypes(formGroup) as any;

        expect(insiderCategoryTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewInsiderCategoryTypes for empty InsiderCategoryTypes initial value', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup();

        const insiderCategoryTypes = service.getInsiderCategoryTypes(formGroup) as any;

        expect(insiderCategoryTypes).toMatchObject({});
      });

      it('should return IInsiderCategoryTypes', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithRequiredData);

        const insiderCategoryTypes = service.getInsiderCategoryTypes(formGroup) as any;

        expect(insiderCategoryTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInsiderCategoryTypes should not enable id FormControl', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInsiderCategoryTypes should disable id FormControl', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
