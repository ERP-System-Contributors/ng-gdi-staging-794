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

import { sampleWithRequiredData, sampleWithNewData } from '../fraud-type.test-samples';

import { FraudTypeFormService } from './fraud-type-form.service';

describe('FraudType Form Service', () => {
  let service: FraudTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraudTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFraudTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFraudTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fraudTypeCode: expect.any(Object),
            fraudType: expect.any(Object),
            fraudTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IFraudType should create a new form with FormGroup', () => {
        const formGroup = service.createFraudTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fraudTypeCode: expect.any(Object),
            fraudType: expect.any(Object),
            fraudTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getFraudType', () => {
      it('should return NewFraudType for default FraudType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFraudTypeFormGroup(sampleWithNewData);

        const fraudType = service.getFraudType(formGroup) as any;

        expect(fraudType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFraudType for empty FraudType initial value', () => {
        const formGroup = service.createFraudTypeFormGroup();

        const fraudType = service.getFraudType(formGroup) as any;

        expect(fraudType).toMatchObject({});
      });

      it('should return IFraudType', () => {
        const formGroup = service.createFraudTypeFormGroup(sampleWithRequiredData);

        const fraudType = service.getFraudType(formGroup) as any;

        expect(fraudType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFraudType should not enable id FormControl', () => {
        const formGroup = service.createFraudTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFraudType should disable id FormControl', () => {
        const formGroup = service.createFraudTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
