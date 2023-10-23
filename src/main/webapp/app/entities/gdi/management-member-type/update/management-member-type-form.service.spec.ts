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

import { sampleWithRequiredData, sampleWithNewData } from '../management-member-type.test-samples';

import { ManagementMemberTypeFormService } from './management-member-type-form.service';

describe('ManagementMemberType Form Service', () => {
  let service: ManagementMemberTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementMemberTypeFormService);
  });

  describe('Service methods', () => {
    describe('createManagementMemberTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createManagementMemberTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            managementMemberTypeCode: expect.any(Object),
            managementMemberType: expect.any(Object),
          })
        );
      });

      it('passing IManagementMemberType should create a new form with FormGroup', () => {
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            managementMemberTypeCode: expect.any(Object),
            managementMemberType: expect.any(Object),
          })
        );
      });
    });

    describe('getManagementMemberType', () => {
      it('should return NewManagementMemberType for default ManagementMemberType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithNewData);

        const managementMemberType = service.getManagementMemberType(formGroup) as any;

        expect(managementMemberType).toMatchObject(sampleWithNewData);
      });

      it('should return NewManagementMemberType for empty ManagementMemberType initial value', () => {
        const formGroup = service.createManagementMemberTypeFormGroup();

        const managementMemberType = service.getManagementMemberType(formGroup) as any;

        expect(managementMemberType).toMatchObject({});
      });

      it('should return IManagementMemberType', () => {
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithRequiredData);

        const managementMemberType = service.getManagementMemberType(formGroup) as any;

        expect(managementMemberType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IManagementMemberType should not enable id FormControl', () => {
        const formGroup = service.createManagementMemberTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewManagementMemberType should disable id FormControl', () => {
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
