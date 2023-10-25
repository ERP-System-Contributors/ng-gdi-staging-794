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

import { sampleWithRequiredData, sampleWithNewData } from '../particulars-of-outlet.test-samples';

import { ParticularsOfOutletFormService } from './particulars-of-outlet-form.service';

describe('ParticularsOfOutlet Form Service', () => {
  let service: ParticularsOfOutletFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticularsOfOutletFormService);
  });

  describe('Service methods', () => {
    describe('createParticularsOfOutletFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createParticularsOfOutletFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessReportingDate: expect.any(Object),
            outletName: expect.any(Object),
            town: expect.any(Object),
            iso6709Latitute: expect.any(Object),
            iso6709Longitude: expect.any(Object),
            cbkApprovalDate: expect.any(Object),
            outletOpeningDate: expect.any(Object),
            outletClosureDate: expect.any(Object),
            licenseFeePayable: expect.any(Object),
            subCountyCode: expect.any(Object),
            bankCode: expect.any(Object),
            outletId: expect.any(Object),
            typeOfOutlet: expect.any(Object),
            outletStatus: expect.any(Object),
          })
        );
      });

      it('passing IParticularsOfOutlet should create a new form with FormGroup', () => {
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessReportingDate: expect.any(Object),
            outletName: expect.any(Object),
            town: expect.any(Object),
            iso6709Latitute: expect.any(Object),
            iso6709Longitude: expect.any(Object),
            cbkApprovalDate: expect.any(Object),
            outletOpeningDate: expect.any(Object),
            outletClosureDate: expect.any(Object),
            licenseFeePayable: expect.any(Object),
            subCountyCode: expect.any(Object),
            bankCode: expect.any(Object),
            outletId: expect.any(Object),
            typeOfOutlet: expect.any(Object),
            outletStatus: expect.any(Object),
          })
        );
      });
    });

    describe('getParticularsOfOutlet', () => {
      it('should return NewParticularsOfOutlet for default ParticularsOfOutlet initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithNewData);

        const particularsOfOutlet = service.getParticularsOfOutlet(formGroup) as any;

        expect(particularsOfOutlet).toMatchObject(sampleWithNewData);
      });

      it('should return NewParticularsOfOutlet for empty ParticularsOfOutlet initial value', () => {
        const formGroup = service.createParticularsOfOutletFormGroup();

        const particularsOfOutlet = service.getParticularsOfOutlet(formGroup) as any;

        expect(particularsOfOutlet).toMatchObject({});
      });

      it('should return IParticularsOfOutlet', () => {
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithRequiredData);

        const particularsOfOutlet = service.getParticularsOfOutlet(formGroup) as any;

        expect(particularsOfOutlet).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IParticularsOfOutlet should not enable id FormControl', () => {
        const formGroup = service.createParticularsOfOutletFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewParticularsOfOutlet should disable id FormControl', () => {
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
