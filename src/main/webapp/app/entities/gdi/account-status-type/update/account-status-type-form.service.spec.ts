import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../account-status-type.test-samples';

import { AccountStatusTypeFormService } from './account-status-type-form.service';

describe('AccountStatusType Form Service', () => {
  let service: AccountStatusTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountStatusTypeFormService);
  });

  describe('Service methods', () => {
    describe('createAccountStatusTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountStatusTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountStatusCode: expect.any(Object),
            accountStatusType: expect.any(Object),
            accountStatusDescription: expect.any(Object),
          })
        );
      });

      it('passing IAccountStatusType should create a new form with FormGroup', () => {
        const formGroup = service.createAccountStatusTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountStatusCode: expect.any(Object),
            accountStatusType: expect.any(Object),
            accountStatusDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountStatusType', () => {
      it('should return NewAccountStatusType for default AccountStatusType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountStatusTypeFormGroup(sampleWithNewData);

        const accountStatusType = service.getAccountStatusType(formGroup) as any;

        expect(accountStatusType).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountStatusType for empty AccountStatusType initial value', () => {
        const formGroup = service.createAccountStatusTypeFormGroup();

        const accountStatusType = service.getAccountStatusType(formGroup) as any;

        expect(accountStatusType).toMatchObject({});
      });

      it('should return IAccountStatusType', () => {
        const formGroup = service.createAccountStatusTypeFormGroup(sampleWithRequiredData);

        const accountStatusType = service.getAccountStatusType(formGroup) as any;

        expect(accountStatusType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountStatusType should not enable id FormControl', () => {
        const formGroup = service.createAccountStatusTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountStatusType should disable id FormControl', () => {
        const formGroup = service.createAccountStatusTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
