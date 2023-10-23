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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-subscription-status-type-code.test-samples';

import { CrbSubscriptionStatusTypeCodeFormService } from './crb-subscription-status-type-code-form.service';

describe('CrbSubscriptionStatusTypeCode Form Service', () => {
  let service: CrbSubscriptionStatusTypeCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbSubscriptionStatusTypeCodeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbSubscriptionStatusTypeCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subscriptionStatusTypeCode: expect.any(Object),
            subscriptionStatusType: expect.any(Object),
            subscriptionStatusTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbSubscriptionStatusTypeCode should create a new form with FormGroup', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subscriptionStatusTypeCode: expect.any(Object),
            subscriptionStatusType: expect.any(Object),
            subscriptionStatusTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbSubscriptionStatusTypeCode', () => {
      it('should return NewCrbSubscriptionStatusTypeCode for default CrbSubscriptionStatusTypeCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithNewData);

        const crbSubscriptionStatusTypeCode = service.getCrbSubscriptionStatusTypeCode(formGroup) as any;

        expect(crbSubscriptionStatusTypeCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbSubscriptionStatusTypeCode for empty CrbSubscriptionStatusTypeCode initial value', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup();

        const crbSubscriptionStatusTypeCode = service.getCrbSubscriptionStatusTypeCode(formGroup) as any;

        expect(crbSubscriptionStatusTypeCode).toMatchObject({});
      });

      it('should return ICrbSubscriptionStatusTypeCode', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithRequiredData);

        const crbSubscriptionStatusTypeCode = service.getCrbSubscriptionStatusTypeCode(formGroup) as any;

        expect(crbSubscriptionStatusTypeCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbSubscriptionStatusTypeCode should not enable id FormControl', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbSubscriptionStatusTypeCode should disable id FormControl', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
