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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-complaint-type.test-samples';

import { CrbComplaintTypeFormService } from './crb-complaint-type-form.service';

describe('CrbComplaintType Form Service', () => {
  let service: CrbComplaintTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbComplaintTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbComplaintTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            complaintTypeCode: expect.any(Object),
            complaintType: expect.any(Object),
            complaintTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbComplaintType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            complaintTypeCode: expect.any(Object),
            complaintType: expect.any(Object),
            complaintTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbComplaintType', () => {
      it('should return NewCrbComplaintType for default CrbComplaintType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithNewData);

        const crbComplaintType = service.getCrbComplaintType(formGroup) as any;

        expect(crbComplaintType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbComplaintType for empty CrbComplaintType initial value', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup();

        const crbComplaintType = service.getCrbComplaintType(formGroup) as any;

        expect(crbComplaintType).toMatchObject({});
      });

      it('should return ICrbComplaintType', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithRequiredData);

        const crbComplaintType = service.getCrbComplaintType(formGroup) as any;

        expect(crbComplaintType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbComplaintType should not enable id FormControl', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbComplaintType should disable id FormControl', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
