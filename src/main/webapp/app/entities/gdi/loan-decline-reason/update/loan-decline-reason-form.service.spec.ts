import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-decline-reason.test-samples';

import { LoanDeclineReasonFormService } from './loan-decline-reason-form.service';

describe('LoanDeclineReason Form Service', () => {
  let service: LoanDeclineReasonFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanDeclineReasonFormService);
  });

  describe('Service methods', () => {
    describe('createLoanDeclineReasonFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanDeclineReasonTypeCode: expect.any(Object),
            loanDeclineReasonType: expect.any(Object),
            loanDeclineReasonDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanDeclineReason should create a new form with FormGroup', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanDeclineReasonTypeCode: expect.any(Object),
            loanDeclineReasonType: expect.any(Object),
            loanDeclineReasonDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanDeclineReason', () => {
      it('should return NewLoanDeclineReason for default LoanDeclineReason initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithNewData);

        const loanDeclineReason = service.getLoanDeclineReason(formGroup) as any;

        expect(loanDeclineReason).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanDeclineReason for empty LoanDeclineReason initial value', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup();

        const loanDeclineReason = service.getLoanDeclineReason(formGroup) as any;

        expect(loanDeclineReason).toMatchObject({});
      });

      it('should return ILoanDeclineReason', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithRequiredData);

        const loanDeclineReason = service.getLoanDeclineReason(formGroup) as any;

        expect(loanDeclineReason).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanDeclineReason should not enable id FormControl', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanDeclineReason should disable id FormControl', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
