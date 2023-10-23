///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
