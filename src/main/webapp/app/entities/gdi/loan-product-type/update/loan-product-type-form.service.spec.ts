import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../loan-product-type.test-samples';

import { LoanProductTypeFormService } from './loan-product-type-form.service';

describe('LoanProductType Form Service', () => {
  let service: LoanProductTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanProductTypeFormService);
  });

  describe('Service methods', () => {
    describe('createLoanProductTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanProductTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            productCode: expect.any(Object),
            productType: expect.any(Object),
            productTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ILoanProductType should create a new form with FormGroup', () => {
        const formGroup = service.createLoanProductTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            productCode: expect.any(Object),
            productType: expect.any(Object),
            productTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanProductType', () => {
      it('should return NewLoanProductType for default LoanProductType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanProductTypeFormGroup(sampleWithNewData);

        const loanProductType = service.getLoanProductType(formGroup) as any;

        expect(loanProductType).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanProductType for empty LoanProductType initial value', () => {
        const formGroup = service.createLoanProductTypeFormGroup();

        const loanProductType = service.getLoanProductType(formGroup) as any;

        expect(loanProductType).toMatchObject({});
      });

      it('should return ILoanProductType', () => {
        const formGroup = service.createLoanProductTypeFormGroup(sampleWithRequiredData);

        const loanProductType = service.getLoanProductType(formGroup) as any;

        expect(loanProductType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanProductType should not enable id FormControl', () => {
        const formGroup = service.createLoanProductTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanProductType should disable id FormControl', () => {
        const formGroup = service.createLoanProductTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
