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

import { sampleWithRequiredData, sampleWithNewData } from '../security-type.test-samples';

import { SecurityTypeFormService } from './security-type-form.service';

describe('SecurityType Form Service', () => {
  let service: SecurityTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityTypeFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityTypeCode: expect.any(Object),
            securityType: expect.any(Object),
            securityTypeDetails: expect.any(Object),
            securityTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ISecurityType should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityTypeCode: expect.any(Object),
            securityType: expect.any(Object),
            securityTypeDetails: expect.any(Object),
            securityTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getSecurityType', () => {
      it('should return NewSecurityType for default SecurityType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecurityTypeFormGroup(sampleWithNewData);

        const securityType = service.getSecurityType(formGroup) as any;

        expect(securityType).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityType for empty SecurityType initial value', () => {
        const formGroup = service.createSecurityTypeFormGroup();

        const securityType = service.getSecurityType(formGroup) as any;

        expect(securityType).toMatchObject({});
      });

      it('should return ISecurityType', () => {
        const formGroup = service.createSecurityTypeFormGroup(sampleWithRequiredData);

        const securityType = service.getSecurityType(formGroup) as any;

        expect(securityType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityType should not enable id FormControl', () => {
        const formGroup = service.createSecurityTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityType should disable id FormControl', () => {
        const formGroup = service.createSecurityTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
