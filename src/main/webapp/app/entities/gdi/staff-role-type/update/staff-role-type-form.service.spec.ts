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

import { sampleWithRequiredData, sampleWithNewData } from '../staff-role-type.test-samples';

import { StaffRoleTypeFormService } from './staff-role-type-form.service';

describe('StaffRoleType Form Service', () => {
  let service: StaffRoleTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffRoleTypeFormService);
  });

  describe('Service methods', () => {
    describe('createStaffRoleTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStaffRoleTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            staffRoleTypeCode: expect.any(Object),
            staffRoleType: expect.any(Object),
            staffRoleTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IStaffRoleType should create a new form with FormGroup', () => {
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            staffRoleTypeCode: expect.any(Object),
            staffRoleType: expect.any(Object),
            staffRoleTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getStaffRoleType', () => {
      it('should return NewStaffRoleType for default StaffRoleType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithNewData);

        const staffRoleType = service.getStaffRoleType(formGroup) as any;

        expect(staffRoleType).toMatchObject(sampleWithNewData);
      });

      it('should return NewStaffRoleType for empty StaffRoleType initial value', () => {
        const formGroup = service.createStaffRoleTypeFormGroup();

        const staffRoleType = service.getStaffRoleType(formGroup) as any;

        expect(staffRoleType).toMatchObject({});
      });

      it('should return IStaffRoleType', () => {
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithRequiredData);

        const staffRoleType = service.getStaffRoleType(formGroup) as any;

        expect(staffRoleType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStaffRoleType should not enable id FormControl', () => {
        const formGroup = service.createStaffRoleTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStaffRoleType should disable id FormControl', () => {
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
