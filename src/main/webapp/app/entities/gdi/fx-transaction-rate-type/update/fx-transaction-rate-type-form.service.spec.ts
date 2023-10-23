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

import { sampleWithRequiredData, sampleWithNewData } from '../fx-transaction-rate-type.test-samples';

import { FxTransactionRateTypeFormService } from './fx-transaction-rate-type-form.service';

describe('FxTransactionRateType Form Service', () => {
  let service: FxTransactionRateTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxTransactionRateTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFxTransactionRateTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFxTransactionRateTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxTransactionRateTypeCode: expect.any(Object),
            fxTransactionRateType: expect.any(Object),
            fxTransactionRateTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IFxTransactionRateType should create a new form with FormGroup', () => {
        const formGroup = service.createFxTransactionRateTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxTransactionRateTypeCode: expect.any(Object),
            fxTransactionRateType: expect.any(Object),
            fxTransactionRateTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getFxTransactionRateType', () => {
      it('should return NewFxTransactionRateType for default FxTransactionRateType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFxTransactionRateTypeFormGroup(sampleWithNewData);

        const fxTransactionRateType = service.getFxTransactionRateType(formGroup) as any;

        expect(fxTransactionRateType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFxTransactionRateType for empty FxTransactionRateType initial value', () => {
        const formGroup = service.createFxTransactionRateTypeFormGroup();

        const fxTransactionRateType = service.getFxTransactionRateType(formGroup) as any;

        expect(fxTransactionRateType).toMatchObject({});
      });

      it('should return IFxTransactionRateType', () => {
        const formGroup = service.createFxTransactionRateTypeFormGroup(sampleWithRequiredData);

        const fxTransactionRateType = service.getFxTransactionRateType(formGroup) as any;

        expect(fxTransactionRateType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFxTransactionRateType should not enable id FormControl', () => {
        const formGroup = service.createFxTransactionRateTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFxTransactionRateType should disable id FormControl', () => {
        const formGroup = service.createFxTransactionRateTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
