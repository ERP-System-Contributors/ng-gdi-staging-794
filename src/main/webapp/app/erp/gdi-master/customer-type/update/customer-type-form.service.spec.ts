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

import { sampleWithRequiredData, sampleWithNewData } from '../customer-type.test-samples';

import { CustomerTypeFormService } from './customer-type-form.service';

describe('CustomerType Form Service', () => {
  let service: CustomerTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCustomerTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomerTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerTypeCode: expect.any(Object),
            customerType: expect.any(Object),
            customerTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICustomerType should create a new form with FormGroup', () => {
        const formGroup = service.createCustomerTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerTypeCode: expect.any(Object),
            customerType: expect.any(Object),
            customerTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomerType', () => {
      it('should return NewCustomerType for default CustomerType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomerTypeFormGroup(sampleWithNewData);

        const customerType = service.getCustomerType(formGroup) as any;

        expect(customerType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomerType for empty CustomerType initial value', () => {
        const formGroup = service.createCustomerTypeFormGroup();

        const customerType = service.getCustomerType(formGroup) as any;

        expect(customerType).toMatchObject({});
      });

      it('should return ICustomerType', () => {
        const formGroup = service.createCustomerTypeFormGroup(sampleWithRequiredData);

        const customerType = service.getCustomerType(formGroup) as any;

        expect(customerType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomerType should not enable id FormControl', () => {
        const formGroup = service.createCustomerTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomerType should disable id FormControl', () => {
        const formGroup = service.createCustomerTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
