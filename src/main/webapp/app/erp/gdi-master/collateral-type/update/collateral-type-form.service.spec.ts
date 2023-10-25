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

import { sampleWithRequiredData, sampleWithNewData } from '../collateral-type.test-samples';

import { CollateralTypeFormService } from './collateral-type-form.service';

describe('CollateralType Form Service', () => {
  let service: CollateralTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollateralTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCollateralTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCollateralTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            collateralTypeCode: expect.any(Object),
            collateralType: expect.any(Object),
            collateralTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICollateralType should create a new form with FormGroup', () => {
        const formGroup = service.createCollateralTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            collateralTypeCode: expect.any(Object),
            collateralType: expect.any(Object),
            collateralTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCollateralType', () => {
      it('should return NewCollateralType for default CollateralType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCollateralTypeFormGroup(sampleWithNewData);

        const collateralType = service.getCollateralType(formGroup) as any;

        expect(collateralType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCollateralType for empty CollateralType initial value', () => {
        const formGroup = service.createCollateralTypeFormGroup();

        const collateralType = service.getCollateralType(formGroup) as any;

        expect(collateralType).toMatchObject({});
      });

      it('should return ICollateralType', () => {
        const formGroup = service.createCollateralTypeFormGroup(sampleWithRequiredData);

        const collateralType = service.getCollateralType(formGroup) as any;

        expect(collateralType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICollateralType should not enable id FormControl', () => {
        const formGroup = service.createCollateralTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCollateralType should disable id FormControl', () => {
        const formGroup = service.createCollateralTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
