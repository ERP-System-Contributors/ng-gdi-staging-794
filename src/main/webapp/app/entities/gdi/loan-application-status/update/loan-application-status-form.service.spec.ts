import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-application-status.test-samples';

import { LoanApplicationStatusFormService } from './loan-application-status-form.service';

describe('LoanApplicationStatus Form Service', () => {
  let service: LoanApplicationStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApplicationStatusFormService);
  });

  describe('Service methods', () => {
    describe('createLoanApplicationStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanApplicationStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanApplicationStatusTypeCode: expect.any(Object),
            loanApplicationStatusType: expect.any(Object),
            loanApplicationStatusDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanApplicationStatus should create a new form with FormGroup', () => {
        const formGroup = service.createLoanApplicationStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanApplicationStatusTypeCode: expect.any(Object),
            loanApplicationStatusType: expect.any(Object),
            loanApplicationStatusDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanApplicationStatus', () => {
      it('should return NewLoanApplicationStatus for default LoanApplicationStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanApplicationStatusFormGroup(sampleWithNewData);

        const loanApplicationStatus = service.getLoanApplicationStatus(formGroup) as any;

        expect(loanApplicationStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanApplicationStatus for empty LoanApplicationStatus initial value', () => {
        const formGroup = service.createLoanApplicationStatusFormGroup();

        const loanApplicationStatus = service.getLoanApplicationStatus(formGroup) as any;

        expect(loanApplicationStatus).toMatchObject({});
      });

      it('should return ILoanApplicationStatus', () => {
        const formGroup = service.createLoanApplicationStatusFormGroup(sampleWithRequiredData);

        const loanApplicationStatus = service.getLoanApplicationStatus(formGroup) as any;

        expect(loanApplicationStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanApplicationStatus should not enable id FormControl', () => {
        const formGroup = service.createLoanApplicationStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanApplicationStatus should disable id FormControl', () => {
        const formGroup = service.createLoanApplicationStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
