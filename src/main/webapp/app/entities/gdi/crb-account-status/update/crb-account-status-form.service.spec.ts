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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-account-status.test-samples';

import { CrbAccountStatusFormService } from './crb-account-status-form.service';

describe('CrbAccountStatus Form Service', () => {
  let service: CrbAccountStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbAccountStatusFormService);
  });

  describe('Service methods', () => {
    describe('createCrbAccountStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbAccountStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountStatusTypeCode: expect.any(Object),
            accountStatusType: expect.any(Object),
            accountStatusTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbAccountStatus should create a new form with FormGroup', () => {
        const formGroup = service.createCrbAccountStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountStatusTypeCode: expect.any(Object),
            accountStatusType: expect.any(Object),
            accountStatusTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbAccountStatus', () => {
      it('should return NewCrbAccountStatus for default CrbAccountStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbAccountStatusFormGroup(sampleWithNewData);

        const crbAccountStatus = service.getCrbAccountStatus(formGroup) as any;

        expect(crbAccountStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbAccountStatus for empty CrbAccountStatus initial value', () => {
        const formGroup = service.createCrbAccountStatusFormGroup();

        const crbAccountStatus = service.getCrbAccountStatus(formGroup) as any;

        expect(crbAccountStatus).toMatchObject({});
      });

      it('should return ICrbAccountStatus', () => {
        const formGroup = service.createCrbAccountStatusFormGroup(sampleWithRequiredData);

        const crbAccountStatus = service.getCrbAccountStatus(formGroup) as any;

        expect(crbAccountStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbAccountStatus should not enable id FormControl', () => {
        const formGroup = service.createCrbAccountStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbAccountStatus should disable id FormControl', () => {
        const formGroup = service.createCrbAccountStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
