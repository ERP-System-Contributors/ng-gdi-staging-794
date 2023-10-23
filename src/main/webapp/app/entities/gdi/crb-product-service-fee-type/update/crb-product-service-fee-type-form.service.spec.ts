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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-product-service-fee-type.test-samples';

import { CrbProductServiceFeeTypeFormService } from './crb-product-service-fee-type-form.service';

describe('CrbProductServiceFeeType Form Service', () => {
  let service: CrbProductServiceFeeTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbProductServiceFeeTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbProductServiceFeeTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chargeTypeCode: expect.any(Object),
            chargeTypeDescription: expect.any(Object),
            chargeTypeCategory: expect.any(Object),
          })
        );
      });

      it('passing ICrbProductServiceFeeType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chargeTypeCode: expect.any(Object),
            chargeTypeDescription: expect.any(Object),
            chargeTypeCategory: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbProductServiceFeeType', () => {
      it('should return NewCrbProductServiceFeeType for default CrbProductServiceFeeType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithNewData);

        const crbProductServiceFeeType = service.getCrbProductServiceFeeType(formGroup) as any;

        expect(crbProductServiceFeeType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbProductServiceFeeType for empty CrbProductServiceFeeType initial value', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup();

        const crbProductServiceFeeType = service.getCrbProductServiceFeeType(formGroup) as any;

        expect(crbProductServiceFeeType).toMatchObject({});
      });

      it('should return ICrbProductServiceFeeType', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithRequiredData);

        const crbProductServiceFeeType = service.getCrbProductServiceFeeType(formGroup) as any;

        expect(crbProductServiceFeeType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbProductServiceFeeType should not enable id FormControl', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbProductServiceFeeType should disable id FormControl', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
