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

import { sampleWithRequiredData, sampleWithNewData } from '../product-type.test-samples';

import { ProductTypeFormService } from './product-type-form.service';

describe('ProductType Form Service', () => {
  let service: ProductTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTypeFormService);
  });

  describe('Service methods', () => {
    describe('createProductTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProductTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            productCode: expect.any(Object),
            productType: expect.any(Object),
            productTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IProductType should create a new form with FormGroup', () => {
        const formGroup = service.createProductTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            productCode: expect.any(Object),
            productType: expect.any(Object),
            productTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getProductType', () => {
      it('should return NewProductType for default ProductType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProductTypeFormGroup(sampleWithNewData);

        const productType = service.getProductType(formGroup) as any;

        expect(productType).toMatchObject(sampleWithNewData);
      });

      it('should return NewProductType for empty ProductType initial value', () => {
        const formGroup = service.createProductTypeFormGroup();

        const productType = service.getProductType(formGroup) as any;

        expect(productType).toMatchObject({});
      });

      it('should return IProductType', () => {
        const formGroup = service.createProductTypeFormGroup(sampleWithRequiredData);

        const productType = service.getProductType(formGroup) as any;

        expect(productType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProductType should not enable id FormControl', () => {
        const formGroup = service.createProductTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProductType should disable id FormControl', () => {
        const formGroup = service.createProductTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
