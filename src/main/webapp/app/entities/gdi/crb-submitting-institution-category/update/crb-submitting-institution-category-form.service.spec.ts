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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-submitting-institution-category.test-samples';

import { CrbSubmittingInstitutionCategoryFormService } from './crb-submitting-institution-category-form.service';

describe('CrbSubmittingInstitutionCategory Form Service', () => {
  let service: CrbSubmittingInstitutionCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbSubmittingInstitutionCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCrbSubmittingInstitutionCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submittingInstitutionCategoryTypeCode: expect.any(Object),
            submittingInstitutionCategoryType: expect.any(Object),
            submittingInstitutionCategoryDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbSubmittingInstitutionCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submittingInstitutionCategoryTypeCode: expect.any(Object),
            submittingInstitutionCategoryType: expect.any(Object),
            submittingInstitutionCategoryDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbSubmittingInstitutionCategory', () => {
      it('should return NewCrbSubmittingInstitutionCategory for default CrbSubmittingInstitutionCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithNewData);

        const crbSubmittingInstitutionCategory = service.getCrbSubmittingInstitutionCategory(formGroup) as any;

        expect(crbSubmittingInstitutionCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbSubmittingInstitutionCategory for empty CrbSubmittingInstitutionCategory initial value', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup();

        const crbSubmittingInstitutionCategory = service.getCrbSubmittingInstitutionCategory(formGroup) as any;

        expect(crbSubmittingInstitutionCategory).toMatchObject({});
      });

      it('should return ICrbSubmittingInstitutionCategory', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithRequiredData);

        const crbSubmittingInstitutionCategory = service.getCrbSubmittingInstitutionCategory(formGroup) as any;

        expect(crbSubmittingInstitutionCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbSubmittingInstitutionCategory should not enable id FormControl', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbSubmittingInstitutionCategory should disable id FormControl', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
