import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-repayment-frequency.test-samples';

import { LoanRepaymentFrequencyFormService } from './loan-repayment-frequency-form.service';

describe('LoanRepaymentFrequency Form Service', () => {
  let service: LoanRepaymentFrequencyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRepaymentFrequencyFormService);
  });

  describe('Service methods', () => {
    describe('createLoanRepaymentFrequencyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            frequencyTypeCode: expect.any(Object),
            frequencyType: expect.any(Object),
            frequencyTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanRepaymentFrequency should create a new form with FormGroup', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            frequencyTypeCode: expect.any(Object),
            frequencyType: expect.any(Object),
            frequencyTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanRepaymentFrequency', () => {
      it('should return NewLoanRepaymentFrequency for default LoanRepaymentFrequency initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithNewData);

        const loanRepaymentFrequency = service.getLoanRepaymentFrequency(formGroup) as any;

        expect(loanRepaymentFrequency).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanRepaymentFrequency for empty LoanRepaymentFrequency initial value', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup();

        const loanRepaymentFrequency = service.getLoanRepaymentFrequency(formGroup) as any;

        expect(loanRepaymentFrequency).toMatchObject({});
      });

      it('should return ILoanRepaymentFrequency', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithRequiredData);

        const loanRepaymentFrequency = service.getLoanRepaymentFrequency(formGroup) as any;

        expect(loanRepaymentFrequency).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanRepaymentFrequency should not enable id FormControl', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanRepaymentFrequency should disable id FormControl', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
