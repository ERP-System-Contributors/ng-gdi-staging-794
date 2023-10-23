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
