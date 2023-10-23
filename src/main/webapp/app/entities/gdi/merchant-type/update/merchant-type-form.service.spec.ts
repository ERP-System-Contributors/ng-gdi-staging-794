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

import { sampleWithRequiredData, sampleWithNewData } from '../merchant-type.test-samples';

import { MerchantTypeFormService } from './merchant-type-form.service';

describe('MerchantType Form Service', () => {
  let service: MerchantTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantTypeFormService);
  });

  describe('Service methods', () => {
    describe('createMerchantTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMerchantTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            merchantTypeCode: expect.any(Object),
            merchantType: expect.any(Object),
            merchantTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IMerchantType should create a new form with FormGroup', () => {
        const formGroup = service.createMerchantTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            merchantTypeCode: expect.any(Object),
            merchantType: expect.any(Object),
            merchantTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getMerchantType', () => {
      it('should return NewMerchantType for default MerchantType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMerchantTypeFormGroup(sampleWithNewData);

        const merchantType = service.getMerchantType(formGroup) as any;

        expect(merchantType).toMatchObject(sampleWithNewData);
      });

      it('should return NewMerchantType for empty MerchantType initial value', () => {
        const formGroup = service.createMerchantTypeFormGroup();

        const merchantType = service.getMerchantType(formGroup) as any;

        expect(merchantType).toMatchObject({});
      });

      it('should return IMerchantType', () => {
        const formGroup = service.createMerchantTypeFormGroup(sampleWithRequiredData);

        const merchantType = service.getMerchantType(formGroup) as any;

        expect(merchantType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMerchantType should not enable id FormControl', () => {
        const formGroup = service.createMerchantTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMerchantType should disable id FormControl', () => {
        const formGroup = service.createMerchantTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
