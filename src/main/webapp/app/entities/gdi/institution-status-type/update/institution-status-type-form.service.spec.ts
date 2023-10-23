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

import { sampleWithRequiredData, sampleWithNewData } from '../institution-status-type.test-samples';

import { InstitutionStatusTypeFormService } from './institution-status-type-form.service';

describe('InstitutionStatusType Form Service', () => {
  let service: InstitutionStatusTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionStatusTypeFormService);
  });

  describe('Service methods', () => {
    describe('createInstitutionStatusTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionStatusCode: expect.any(Object),
            institutionStatusType: expect.any(Object),
            insitutionStatusTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IInstitutionStatusType should create a new form with FormGroup', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionStatusCode: expect.any(Object),
            institutionStatusType: expect.any(Object),
            insitutionStatusTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getInstitutionStatusType', () => {
      it('should return NewInstitutionStatusType for default InstitutionStatusType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithNewData);

        const institutionStatusType = service.getInstitutionStatusType(formGroup) as any;

        expect(institutionStatusType).toMatchObject(sampleWithNewData);
      });

      it('should return NewInstitutionStatusType for empty InstitutionStatusType initial value', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup();

        const institutionStatusType = service.getInstitutionStatusType(formGroup) as any;

        expect(institutionStatusType).toMatchObject({});
      });

      it('should return IInstitutionStatusType', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithRequiredData);

        const institutionStatusType = service.getInstitutionStatusType(formGroup) as any;

        expect(institutionStatusType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInstitutionStatusType should not enable id FormControl', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInstitutionStatusType should disable id FormControl', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
