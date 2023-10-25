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

import { sampleWithRequiredData, sampleWithNewData } from '../fx-transaction-type.test-samples';

import { FxTransactionTypeFormService } from './fx-transaction-type-form.service';

describe('FxTransactionType Form Service', () => {
  let service: FxTransactionTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxTransactionTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFxTransactionTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFxTransactionTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxTransactionTypeCode: expect.any(Object),
            fxTransactionType: expect.any(Object),
            fxTransactionTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IFxTransactionType should create a new form with FormGroup', () => {
        const formGroup = service.createFxTransactionTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxTransactionTypeCode: expect.any(Object),
            fxTransactionType: expect.any(Object),
            fxTransactionTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getFxTransactionType', () => {
      it('should return NewFxTransactionType for default FxTransactionType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFxTransactionTypeFormGroup(sampleWithNewData);

        const fxTransactionType = service.getFxTransactionType(formGroup) as any;

        expect(fxTransactionType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFxTransactionType for empty FxTransactionType initial value', () => {
        const formGroup = service.createFxTransactionTypeFormGroup();

        const fxTransactionType = service.getFxTransactionType(formGroup) as any;

        expect(fxTransactionType).toMatchObject({});
      });

      it('should return IFxTransactionType', () => {
        const formGroup = service.createFxTransactionTypeFormGroup(sampleWithRequiredData);

        const fxTransactionType = service.getFxTransactionType(formGroup) as any;

        expect(fxTransactionType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFxTransactionType should not enable id FormControl', () => {
        const formGroup = service.createFxTransactionTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFxTransactionType should disable id FormControl', () => {
        const formGroup = service.createFxTransactionTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
