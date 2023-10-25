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
