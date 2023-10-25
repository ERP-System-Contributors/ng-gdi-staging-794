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

import { sampleWithRequiredData, sampleWithNewData } from '../fx-customer-type.test-samples';

import { FxCustomerTypeFormService } from './fx-customer-type-form.service';

describe('FxCustomerType Form Service', () => {
  let service: FxCustomerTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxCustomerTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFxCustomerTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFxCustomerTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            foreignExchangeCustomerTypeCode: expect.any(Object),
            foreignCustomerType: expect.any(Object),
          })
        );
      });

      it('passing IFxCustomerType should create a new form with FormGroup', () => {
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            foreignExchangeCustomerTypeCode: expect.any(Object),
            foreignCustomerType: expect.any(Object),
          })
        );
      });
    });

    describe('getFxCustomerType', () => {
      it('should return NewFxCustomerType for default FxCustomerType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithNewData);

        const fxCustomerType = service.getFxCustomerType(formGroup) as any;

        expect(fxCustomerType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFxCustomerType for empty FxCustomerType initial value', () => {
        const formGroup = service.createFxCustomerTypeFormGroup();

        const fxCustomerType = service.getFxCustomerType(formGroup) as any;

        expect(fxCustomerType).toMatchObject({});
      });

      it('should return IFxCustomerType', () => {
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithRequiredData);

        const fxCustomerType = service.getFxCustomerType(formGroup) as any;

        expect(fxCustomerType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFxCustomerType should not enable id FormControl', () => {
        const formGroup = service.createFxCustomerTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFxCustomerType should disable id FormControl', () => {
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
