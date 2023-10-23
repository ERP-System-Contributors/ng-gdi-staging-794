import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-account-category.test-samples';

import { LoanAccountCategoryFormService } from './loan-account-category-form.service';

describe('LoanAccountCategory Form Service', () => {
  let service: LoanAccountCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanAccountCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createLoanAccountCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanAccountCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanAccountMutationCode: expect.any(Object),
            loanAccountMutationType: expect.any(Object),
            loanAccountMutationDetails: expect.any(Object),
            loanAccountMutationDescription: expect.any(Object),
          })
        );
      });

      it('passing ILoanAccountCategory should create a new form with FormGroup', () => {
        const formGroup = service.createLoanAccountCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanAccountMutationCode: expect.any(Object),
            loanAccountMutationType: expect.any(Object),
            loanAccountMutationDetails: expect.any(Object),
            loanAccountMutationDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanAccountCategory', () => {
      it('should return NewLoanAccountCategory for default LoanAccountCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanAccountCategoryFormGroup(sampleWithNewData);

        const loanAccountCategory = service.getLoanAccountCategory(formGroup) as any;

        expect(loanAccountCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanAccountCategory for empty LoanAccountCategory initial value', () => {
        const formGroup = service.createLoanAccountCategoryFormGroup();

        const loanAccountCategory = service.getLoanAccountCategory(formGroup) as any;

        expect(loanAccountCategory).toMatchObject({});
      });

      it('should return ILoanAccountCategory', () => {
        const formGroup = service.createLoanAccountCategoryFormGroup(sampleWithRequiredData);

        const loanAccountCategory = service.getLoanAccountCategory(formGroup) as any;

        expect(loanAccountCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanAccountCategory should not enable id FormControl', () => {
        const formGroup = service.createLoanAccountCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanAccountCategory should disable id FormControl', () => {
        const formGroup = service.createLoanAccountCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
