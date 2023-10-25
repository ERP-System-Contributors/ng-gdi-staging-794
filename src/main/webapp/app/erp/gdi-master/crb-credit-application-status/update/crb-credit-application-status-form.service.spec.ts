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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-credit-application-status.test-samples';

import { CrbCreditApplicationStatusFormService } from './crb-credit-application-status-form.service';

describe('CrbCreditApplicationStatus Form Service', () => {
  let service: CrbCreditApplicationStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbCreditApplicationStatusFormService);
  });

  describe('Service methods', () => {
    describe('createCrbCreditApplicationStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbCreditApplicationStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            crbCreditApplicationStatusTypeCode: expect.any(Object),
            crbCreditApplicationStatusType: expect.any(Object),
            crbCreditApplicationStatusDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbCreditApplicationStatus should create a new form with FormGroup', () => {
        const formGroup = service.createCrbCreditApplicationStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            crbCreditApplicationStatusTypeCode: expect.any(Object),
            crbCreditApplicationStatusType: expect.any(Object),
            crbCreditApplicationStatusDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbCreditApplicationStatus', () => {
      it('should return NewCrbCreditApplicationStatus for default CrbCreditApplicationStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbCreditApplicationStatusFormGroup(sampleWithNewData);

        const crbCreditApplicationStatus = service.getCrbCreditApplicationStatus(formGroup) as any;

        expect(crbCreditApplicationStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbCreditApplicationStatus for empty CrbCreditApplicationStatus initial value', () => {
        const formGroup = service.createCrbCreditApplicationStatusFormGroup();

        const crbCreditApplicationStatus = service.getCrbCreditApplicationStatus(formGroup) as any;

        expect(crbCreditApplicationStatus).toMatchObject({});
      });

      it('should return ICrbCreditApplicationStatus', () => {
        const formGroup = service.createCrbCreditApplicationStatusFormGroup(sampleWithRequiredData);

        const crbCreditApplicationStatus = service.getCrbCreditApplicationStatus(formGroup) as any;

        expect(crbCreditApplicationStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbCreditApplicationStatus should not enable id FormControl', () => {
        const formGroup = service.createCrbCreditApplicationStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbCreditApplicationStatus should disable id FormControl', () => {
        const formGroup = service.createCrbCreditApplicationStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
