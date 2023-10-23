import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-restructure-item.test-samples';

import { LoanRestructureItemFormService } from './loan-restructure-item-form.service';

describe('LoanRestructureItem Form Service', () => {
  let service: LoanRestructureItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRestructureItemFormService);
  });

  describe('Service methods', () => {
    describe('createLoanRestructureItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanRestructureItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureItemCode: expect.any(Object),
            loanRestructureItemType: expect.any(Object),
            loanRestructureItemDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanRestructureItem should create a new form with FormGroup', () => {
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureItemCode: expect.any(Object),
            loanRestructureItemType: expect.any(Object),
            loanRestructureItemDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanRestructureItem', () => {
      it('should return NewLoanRestructureItem for default LoanRestructureItem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithNewData);

        const loanRestructureItem = service.getLoanRestructureItem(formGroup) as any;

        expect(loanRestructureItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanRestructureItem for empty LoanRestructureItem initial value', () => {
        const formGroup = service.createLoanRestructureItemFormGroup();

        const loanRestructureItem = service.getLoanRestructureItem(formGroup) as any;

        expect(loanRestructureItem).toMatchObject({});
      });

      it('should return ILoanRestructureItem', () => {
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithRequiredData);

        const loanRestructureItem = service.getLoanRestructureItem(formGroup) as any;

        expect(loanRestructureItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanRestructureItem should not enable id FormControl', () => {
        const formGroup = service.createLoanRestructureItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanRestructureItem should disable id FormControl', () => {
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
