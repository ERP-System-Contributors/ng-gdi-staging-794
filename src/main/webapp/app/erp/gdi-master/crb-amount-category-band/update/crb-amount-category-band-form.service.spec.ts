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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-amount-category-band.test-samples';

import { CrbAmountCategoryBandFormService } from './crb-amount-category-band-form.service';

describe('CrbAmountCategoryBand Form Service', () => {
  let service: CrbAmountCategoryBandFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbAmountCategoryBandFormService);
  });

  describe('Service methods', () => {
    describe('createCrbAmountCategoryBandFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amountCategoryBandCode: expect.any(Object),
            amountCategoryBand: expect.any(Object),
            amountCategoryBandDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbAmountCategoryBand should create a new form with FormGroup', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amountCategoryBandCode: expect.any(Object),
            amountCategoryBand: expect.any(Object),
            amountCategoryBandDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbAmountCategoryBand', () => {
      it('should return NewCrbAmountCategoryBand for default CrbAmountCategoryBand initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithNewData);

        const crbAmountCategoryBand = service.getCrbAmountCategoryBand(formGroup) as any;

        expect(crbAmountCategoryBand).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbAmountCategoryBand for empty CrbAmountCategoryBand initial value', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup();

        const crbAmountCategoryBand = service.getCrbAmountCategoryBand(formGroup) as any;

        expect(crbAmountCategoryBand).toMatchObject({});
      });

      it('should return ICrbAmountCategoryBand', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithRequiredData);

        const crbAmountCategoryBand = service.getCrbAmountCategoryBand(formGroup) as any;

        expect(crbAmountCategoryBand).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbAmountCategoryBand should not enable id FormControl', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbAmountCategoryBand should disable id FormControl', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
