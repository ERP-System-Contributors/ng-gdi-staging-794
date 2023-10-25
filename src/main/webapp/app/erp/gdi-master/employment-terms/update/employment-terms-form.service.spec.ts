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

import { sampleWithRequiredData, sampleWithNewData } from '../employment-terms.test-samples';

import { EmploymentTermsFormService } from './employment-terms-form.service';

describe('EmploymentTerms Form Service', () => {
  let service: EmploymentTermsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentTermsFormService);
  });

  describe('Service methods', () => {
    describe('createEmploymentTermsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmploymentTermsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            employmentTermsCode: expect.any(Object),
            employmentTermsStatus: expect.any(Object),
          })
        );
      });

      it('passing IEmploymentTerms should create a new form with FormGroup', () => {
        const formGroup = service.createEmploymentTermsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            employmentTermsCode: expect.any(Object),
            employmentTermsStatus: expect.any(Object),
          })
        );
      });
    });

    describe('getEmploymentTerms', () => {
      it('should return NewEmploymentTerms for default EmploymentTerms initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmploymentTermsFormGroup(sampleWithNewData);

        const employmentTerms = service.getEmploymentTerms(formGroup) as any;

        expect(employmentTerms).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmploymentTerms for empty EmploymentTerms initial value', () => {
        const formGroup = service.createEmploymentTermsFormGroup();

        const employmentTerms = service.getEmploymentTerms(formGroup) as any;

        expect(employmentTerms).toMatchObject({});
      });

      it('should return IEmploymentTerms', () => {
        const formGroup = service.createEmploymentTermsFormGroup(sampleWithRequiredData);

        const employmentTerms = service.getEmploymentTerms(formGroup) as any;

        expect(employmentTerms).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmploymentTerms should not enable id FormControl', () => {
        const formGroup = service.createEmploymentTermsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmploymentTerms should disable id FormControl', () => {
        const formGroup = service.createEmploymentTermsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
