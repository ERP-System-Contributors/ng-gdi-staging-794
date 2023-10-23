import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../account-balance.test-samples';

import { AccountBalanceFormService } from './account-balance-form.service';

describe('AccountBalance Form Service', () => {
  let service: AccountBalanceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountBalanceFormService);
  });

  describe('Service methods', () => {
    describe('createAccountBalanceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountBalanceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            customerId: expect.any(Object),
            accountContractNumber: expect.any(Object),
            accruedInterestBalanceFCY: expect.any(Object),
            accruedInterestBalanceLCY: expect.any(Object),
            accountBalanceFCY: expect.any(Object),
            accountBalanceLCY: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            currencyCode: expect.any(Object),
          })
        );
      });

      it('passing IAccountBalance should create a new form with FormGroup', () => {
        const formGroup = service.createAccountBalanceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            customerId: expect.any(Object),
            accountContractNumber: expect.any(Object),
            accruedInterestBalanceFCY: expect.any(Object),
            accruedInterestBalanceLCY: expect.any(Object),
            accountBalanceFCY: expect.any(Object),
            accountBalanceLCY: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            currencyCode: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountBalance', () => {
      it('should return NewAccountBalance for default AccountBalance initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountBalanceFormGroup(sampleWithNewData);

        const accountBalance = service.getAccountBalance(formGroup) as any;

        expect(accountBalance).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountBalance for empty AccountBalance initial value', () => {
        const formGroup = service.createAccountBalanceFormGroup();

        const accountBalance = service.getAccountBalance(formGroup) as any;

        expect(accountBalance).toMatchObject({});
      });

      it('should return IAccountBalance', () => {
        const formGroup = service.createAccountBalanceFormGroup(sampleWithRequiredData);

        const accountBalance = service.getAccountBalance(formGroup) as any;

        expect(accountBalance).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountBalance should not enable id FormControl', () => {
        const formGroup = service.createAccountBalanceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountBalance should disable id FormControl', () => {
        const formGroup = service.createAccountBalanceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
