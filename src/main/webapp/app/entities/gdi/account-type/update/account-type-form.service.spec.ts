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

import { sampleWithRequiredData, sampleWithNewData } from '../account-type.test-samples';

import { AccountTypeFormService } from './account-type-form.service';

describe('AccountType Form Service', () => {
  let service: AccountTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountTypeFormService);
  });

  describe('Service methods', () => {
    describe('createAccountTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountTypeCode: expect.any(Object),
            accountType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing IAccountType should create a new form with FormGroup', () => {
        const formGroup = service.createAccountTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountTypeCode: expect.any(Object),
            accountType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountType', () => {
      it('should return NewAccountType for default AccountType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountTypeFormGroup(sampleWithNewData);

        const accountType = service.getAccountType(formGroup) as any;

        expect(accountType).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountType for empty AccountType initial value', () => {
        const formGroup = service.createAccountTypeFormGroup();

        const accountType = service.getAccountType(formGroup) as any;

        expect(accountType).toMatchObject({});
      });

      it('should return IAccountType', () => {
        const formGroup = service.createAccountTypeFormGroup(sampleWithRequiredData);

        const accountType = service.getAccountType(formGroup) as any;

        expect(accountType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountType should not enable id FormControl', () => {
        const formGroup = service.createAccountTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountType should disable id FormControl', () => {
        const formGroup = service.createAccountTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
