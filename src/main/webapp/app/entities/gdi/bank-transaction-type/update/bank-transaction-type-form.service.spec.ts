import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bank-transaction-type.test-samples';

import { BankTransactionTypeFormService } from './bank-transaction-type-form.service';

describe('BankTransactionType Form Service', () => {
  let service: BankTransactionTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankTransactionTypeFormService);
  });

  describe('Service methods', () => {
    describe('createBankTransactionTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBankTransactionTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionTypeCode: expect.any(Object),
            transactionTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IBankTransactionType should create a new form with FormGroup', () => {
        const formGroup = service.createBankTransactionTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionTypeCode: expect.any(Object),
            transactionTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getBankTransactionType', () => {
      it('should return NewBankTransactionType for default BankTransactionType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBankTransactionTypeFormGroup(sampleWithNewData);

        const bankTransactionType = service.getBankTransactionType(formGroup) as any;

        expect(bankTransactionType).toMatchObject(sampleWithNewData);
      });

      it('should return NewBankTransactionType for empty BankTransactionType initial value', () => {
        const formGroup = service.createBankTransactionTypeFormGroup();

        const bankTransactionType = service.getBankTransactionType(formGroup) as any;

        expect(bankTransactionType).toMatchObject({});
      });

      it('should return IBankTransactionType', () => {
        const formGroup = service.createBankTransactionTypeFormGroup(sampleWithRequiredData);

        const bankTransactionType = service.getBankTransactionType(formGroup) as any;

        expect(bankTransactionType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBankTransactionType should not enable id FormControl', () => {
        const formGroup = service.createBankTransactionTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBankTransactionType should disable id FormControl', () => {
        const formGroup = service.createBankTransactionTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
