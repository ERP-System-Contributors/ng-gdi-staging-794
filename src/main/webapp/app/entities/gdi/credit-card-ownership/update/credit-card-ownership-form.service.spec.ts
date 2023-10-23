import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../credit-card-ownership.test-samples';

import { CreditCardOwnershipFormService } from './credit-card-ownership-form.service';

describe('CreditCardOwnership Form Service', () => {
  let service: CreditCardOwnershipFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardOwnershipFormService);
  });

  describe('Service methods', () => {
    describe('createCreditCardOwnershipFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditCardOwnershipCategoryCode: expect.any(Object),
            creditCardOwnershipCategoryType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing ICreditCardOwnership should create a new form with FormGroup', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditCardOwnershipCategoryCode: expect.any(Object),
            creditCardOwnershipCategoryType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getCreditCardOwnership', () => {
      it('should return NewCreditCardOwnership for default CreditCardOwnership initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithNewData);

        const creditCardOwnership = service.getCreditCardOwnership(formGroup) as any;

        expect(creditCardOwnership).toMatchObject(sampleWithNewData);
      });

      it('should return NewCreditCardOwnership for empty CreditCardOwnership initial value', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup();

        const creditCardOwnership = service.getCreditCardOwnership(formGroup) as any;

        expect(creditCardOwnership).toMatchObject({});
      });

      it('should return ICreditCardOwnership', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithRequiredData);

        const creditCardOwnership = service.getCreditCardOwnership(formGroup) as any;

        expect(creditCardOwnership).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICreditCardOwnership should not enable id FormControl', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCreditCardOwnership should disable id FormControl', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
