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

import { sampleWithRequiredData, sampleWithNewData } from '../derivative-sub-type.test-samples';

import { DerivativeSubTypeFormService } from './derivative-sub-type-form.service';

describe('DerivativeSubType Form Service', () => {
  let service: DerivativeSubTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DerivativeSubTypeFormService);
  });

  describe('Service methods', () => {
    describe('createDerivativeSubTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            financialDerivativeSubTypeCode: expect.any(Object),
            financialDerivativeSubTye: expect.any(Object),
            financialDerivativeSubtypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IDerivativeSubType should create a new form with FormGroup', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            financialDerivativeSubTypeCode: expect.any(Object),
            financialDerivativeSubTye: expect.any(Object),
            financialDerivativeSubtypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getDerivativeSubType', () => {
      it('should return NewDerivativeSubType for default DerivativeSubType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithNewData);

        const derivativeSubType = service.getDerivativeSubType(formGroup) as any;

        expect(derivativeSubType).toMatchObject(sampleWithNewData);
      });

      it('should return NewDerivativeSubType for empty DerivativeSubType initial value', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup();

        const derivativeSubType = service.getDerivativeSubType(formGroup) as any;

        expect(derivativeSubType).toMatchObject({});
      });

      it('should return IDerivativeSubType', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithRequiredData);

        const derivativeSubType = service.getDerivativeSubType(formGroup) as any;

        expect(derivativeSubType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDerivativeSubType should not enable id FormControl', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDerivativeSubType should disable id FormControl', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
