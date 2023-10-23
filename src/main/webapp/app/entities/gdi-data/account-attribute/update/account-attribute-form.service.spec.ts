import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../account-attribute.test-samples';

import { AccountAttributeFormService } from './account-attribute-form.service';

describe('AccountAttribute Form Service', () => {
  let service: AccountAttributeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountAttributeFormService);
  });

  describe('Service methods', () => {
    describe('createAccountAttributeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountAttributeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            customerNumber: expect.any(Object),
            accountContractNumber: expect.any(Object),
            accountName: expect.any(Object),
            accountOpeningDate: expect.any(Object),
            accountClosingDate: expect.any(Object),
            debitInterestRate: expect.any(Object),
            creditInterestRate: expect.any(Object),
            sanctionedAccountLimitFcy: expect.any(Object),
            sanctionedAccountLimitLcy: expect.any(Object),
            accountStatusChangeDate: expect.any(Object),
            expiryDate: expect.any(Object),
            bankCode: expect.any(Object),
            branchCode: expect.any(Object),
            accountOwnershipType: expect.any(Object),
          })
        );
      });

      it('passing IAccountAttribute should create a new form with FormGroup', () => {
        const formGroup = service.createAccountAttributeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            customerNumber: expect.any(Object),
            accountContractNumber: expect.any(Object),
            accountName: expect.any(Object),
            accountOpeningDate: expect.any(Object),
            accountClosingDate: expect.any(Object),
            debitInterestRate: expect.any(Object),
            creditInterestRate: expect.any(Object),
            sanctionedAccountLimitFcy: expect.any(Object),
            sanctionedAccountLimitLcy: expect.any(Object),
            accountStatusChangeDate: expect.any(Object),
            expiryDate: expect.any(Object),
            bankCode: expect.any(Object),
            branchCode: expect.any(Object),
            accountOwnershipType: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountAttribute', () => {
      it('should return NewAccountAttribute for default AccountAttribute initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountAttributeFormGroup(sampleWithNewData);

        const accountAttribute = service.getAccountAttribute(formGroup) as any;

        expect(accountAttribute).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountAttribute for empty AccountAttribute initial value', () => {
        const formGroup = service.createAccountAttributeFormGroup();

        const accountAttribute = service.getAccountAttribute(formGroup) as any;

        expect(accountAttribute).toMatchObject({});
      });

      it('should return IAccountAttribute', () => {
        const formGroup = service.createAccountAttributeFormGroup(sampleWithRequiredData);

        const accountAttribute = service.getAccountAttribute(formGroup) as any;

        expect(accountAttribute).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountAttribute should not enable id FormControl', () => {
        const formGroup = service.createAccountAttributeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountAttribute should disable id FormControl', () => {
        const formGroup = service.createAccountAttributeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
