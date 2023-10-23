import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-restructure-flag.test-samples';

import { LoanRestructureFlagFormService } from './loan-restructure-flag-form.service';

describe('LoanRestructureFlag Form Service', () => {
  let service: LoanRestructureFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRestructureFlagFormService);
  });

  describe('Service methods', () => {
    describe('createLoanRestructureFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureFlagCode: expect.any(Object),
            loanRestructureFlagType: expect.any(Object),
            loanRestructureFlagDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanRestructureFlag should create a new form with FormGroup', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureFlagCode: expect.any(Object),
            loanRestructureFlagType: expect.any(Object),
            loanRestructureFlagDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanRestructureFlag', () => {
      it('should return NewLoanRestructureFlag for default LoanRestructureFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithNewData);

        const loanRestructureFlag = service.getLoanRestructureFlag(formGroup) as any;

        expect(loanRestructureFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanRestructureFlag for empty LoanRestructureFlag initial value', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup();

        const loanRestructureFlag = service.getLoanRestructureFlag(formGroup) as any;

        expect(loanRestructureFlag).toMatchObject({});
      });

      it('should return ILoanRestructureFlag', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithRequiredData);

        const loanRestructureFlag = service.getLoanRestructureFlag(formGroup) as any;

        expect(loanRestructureFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanRestructureFlag should not enable id FormControl', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanRestructureFlag should disable id FormControl', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
