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

import { sampleWithRequiredData, sampleWithNewData } from '../security-classification-type.test-samples';

import { SecurityClassificationTypeFormService } from './security-classification-type-form.service';

describe('SecurityClassificationType Form Service', () => {
  let service: SecurityClassificationTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityClassificationTypeFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityClassificationTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityClassificationTypeCode: expect.any(Object),
            securityClassificationType: expect.any(Object),
            securityClassificationDetails: expect.any(Object),
          })
        );
      });

      it('passing ISecurityClassificationType should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityClassificationTypeCode: expect.any(Object),
            securityClassificationType: expect.any(Object),
            securityClassificationDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getSecurityClassificationType', () => {
      it('should return NewSecurityClassificationType for default SecurityClassificationType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithNewData);

        const securityClassificationType = service.getSecurityClassificationType(formGroup) as any;

        expect(securityClassificationType).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityClassificationType for empty SecurityClassificationType initial value', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup();

        const securityClassificationType = service.getSecurityClassificationType(formGroup) as any;

        expect(securityClassificationType).toMatchObject({});
      });

      it('should return ISecurityClassificationType', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithRequiredData);

        const securityClassificationType = service.getSecurityClassificationType(formGroup) as any;

        expect(securityClassificationType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityClassificationType should not enable id FormControl', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityClassificationType should disable id FormControl', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
