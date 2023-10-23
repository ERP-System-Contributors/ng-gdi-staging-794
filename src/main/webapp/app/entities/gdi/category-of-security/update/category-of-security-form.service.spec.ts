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

import { sampleWithRequiredData, sampleWithNewData } from '../category-of-security.test-samples';

import { CategoryOfSecurityFormService } from './category-of-security-form.service';

describe('CategoryOfSecurity Form Service', () => {
  let service: CategoryOfSecurityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryOfSecurityFormService);
  });

  describe('Service methods', () => {
    describe('createCategoryOfSecurityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryOfSecurity: expect.any(Object),
            categoryOfSecurityDetails: expect.any(Object),
            categoryOfSecurityDescription: expect.any(Object),
          })
        );
      });

      it('passing ICategoryOfSecurity should create a new form with FormGroup', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryOfSecurity: expect.any(Object),
            categoryOfSecurityDetails: expect.any(Object),
            categoryOfSecurityDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCategoryOfSecurity', () => {
      it('should return NewCategoryOfSecurity for default CategoryOfSecurity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithNewData);

        const categoryOfSecurity = service.getCategoryOfSecurity(formGroup) as any;

        expect(categoryOfSecurity).toMatchObject(sampleWithNewData);
      });

      it('should return NewCategoryOfSecurity for empty CategoryOfSecurity initial value', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup();

        const categoryOfSecurity = service.getCategoryOfSecurity(formGroup) as any;

        expect(categoryOfSecurity).toMatchObject({});
      });

      it('should return ICategoryOfSecurity', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithRequiredData);

        const categoryOfSecurity = service.getCategoryOfSecurity(formGroup) as any;

        expect(categoryOfSecurity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICategoryOfSecurity should not enable id FormControl', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCategoryOfSecurity should disable id FormControl', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
