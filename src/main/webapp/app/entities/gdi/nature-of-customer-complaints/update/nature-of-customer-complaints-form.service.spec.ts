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

import { sampleWithRequiredData, sampleWithNewData } from '../nature-of-customer-complaints.test-samples';

import { NatureOfCustomerComplaintsFormService } from './nature-of-customer-complaints-form.service';

describe('NatureOfCustomerComplaints Form Service', () => {
  let service: NatureOfCustomerComplaintsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureOfCustomerComplaintsFormService);
  });

  describe('Service methods', () => {
    describe('createNatureOfCustomerComplaintsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfComplaintTypeCode: expect.any(Object),
            natureOfComplaintType: expect.any(Object),
            natureOfComplaintTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing INatureOfCustomerComplaints should create a new form with FormGroup', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfComplaintTypeCode: expect.any(Object),
            natureOfComplaintType: expect.any(Object),
            natureOfComplaintTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getNatureOfCustomerComplaints', () => {
      it('should return NewNatureOfCustomerComplaints for default NatureOfCustomerComplaints initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithNewData);

        const natureOfCustomerComplaints = service.getNatureOfCustomerComplaints(formGroup) as any;

        expect(natureOfCustomerComplaints).toMatchObject(sampleWithNewData);
      });

      it('should return NewNatureOfCustomerComplaints for empty NatureOfCustomerComplaints initial value', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup();

        const natureOfCustomerComplaints = service.getNatureOfCustomerComplaints(formGroup) as any;

        expect(natureOfCustomerComplaints).toMatchObject({});
      });

      it('should return INatureOfCustomerComplaints', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithRequiredData);

        const natureOfCustomerComplaints = service.getNatureOfCustomerComplaints(formGroup) as any;

        expect(natureOfCustomerComplaints).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INatureOfCustomerComplaints should not enable id FormControl', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNatureOfCustomerComplaints should disable id FormControl', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
