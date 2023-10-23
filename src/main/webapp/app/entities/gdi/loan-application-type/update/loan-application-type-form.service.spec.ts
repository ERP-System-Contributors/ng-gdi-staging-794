import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-application-type.test-samples';

import { LoanApplicationTypeFormService } from './loan-application-type-form.service';

describe('LoanApplicationType Form Service', () => {
  let service: LoanApplicationTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApplicationTypeFormService);
  });

  describe('Service methods', () => {
    describe('createLoanApplicationTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanApplicationTypeCode: expect.any(Object),
            loanApplicationType: expect.any(Object),
            loanApplicationDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanApplicationType should create a new form with FormGroup', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanApplicationTypeCode: expect.any(Object),
            loanApplicationType: expect.any(Object),
            loanApplicationDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanApplicationType', () => {
      it('should return NewLoanApplicationType for default LoanApplicationType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithNewData);

        const loanApplicationType = service.getLoanApplicationType(formGroup) as any;

        expect(loanApplicationType).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanApplicationType for empty LoanApplicationType initial value', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup();

        const loanApplicationType = service.getLoanApplicationType(formGroup) as any;

        expect(loanApplicationType).toMatchObject({});
      });

      it('should return ILoanApplicationType', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithRequiredData);

        const loanApplicationType = service.getLoanApplicationType(formGroup) as any;

        expect(loanApplicationType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanApplicationType should not enable id FormControl', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanApplicationType should disable id FormControl', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
