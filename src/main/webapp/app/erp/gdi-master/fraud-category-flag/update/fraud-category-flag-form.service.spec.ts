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

import { sampleWithRequiredData, sampleWithNewData } from '../fraud-category-flag.test-samples';

import { FraudCategoryFlagFormService } from './fraud-category-flag-form.service';

describe('FraudCategoryFlag Form Service', () => {
  let service: FraudCategoryFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraudCategoryFlagFormService);
  });

  describe('Service methods', () => {
    describe('createFraudCategoryFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fraudCategoryFlag: expect.any(Object),
            fraudCategoryTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IFraudCategoryFlag should create a new form with FormGroup', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fraudCategoryFlag: expect.any(Object),
            fraudCategoryTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getFraudCategoryFlag', () => {
      it('should return NewFraudCategoryFlag for default FraudCategoryFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithNewData);

        const fraudCategoryFlag = service.getFraudCategoryFlag(formGroup) as any;

        expect(fraudCategoryFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewFraudCategoryFlag for empty FraudCategoryFlag initial value', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup();

        const fraudCategoryFlag = service.getFraudCategoryFlag(formGroup) as any;

        expect(fraudCategoryFlag).toMatchObject({});
      });

      it('should return IFraudCategoryFlag', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithRequiredData);

        const fraudCategoryFlag = service.getFraudCategoryFlag(formGroup) as any;

        expect(fraudCategoryFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFraudCategoryFlag should not enable id FormControl', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFraudCategoryFlag should disable id FormControl', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
