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

import { sampleWithRequiredData, sampleWithNewData } from '../fx-receipt-purpose-type.test-samples';

import { FxReceiptPurposeTypeFormService } from './fx-receipt-purpose-type-form.service';

describe('FxReceiptPurposeType Form Service', () => {
  let service: FxReceiptPurposeTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxReceiptPurposeTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFxReceiptPurposeTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFxReceiptPurposeTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            itemCode: expect.any(Object),
            attribute1ReceiptPaymentPurposeCode: expect.any(Object),
            attribute1ReceiptPaymentPurposeType: expect.any(Object),
            attribute2ReceiptPaymentPurposeCode: expect.any(Object),
            attribute2ReceiptPaymentPurposeDescription: expect.any(Object),
            attribute3ReceiptPaymentPurposeCode: expect.any(Object),
            attribute3ReceiptPaymentPurposeDescription: expect.any(Object),
            attribute4ReceiptPaymentPurposeCode: expect.any(Object),
            attribute4ReceiptPaymentPurposeDescription: expect.any(Object),
            attribute5ReceiptPaymentPurposeCode: expect.any(Object),
            attribute5ReceiptPaymentPurposeDescription: expect.any(Object),
            lastChild: expect.any(Object),
          })
        );
      });

      it('passing IFxReceiptPurposeType should create a new form with FormGroup', () => {
        const formGroup = service.createFxReceiptPurposeTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            itemCode: expect.any(Object),
            attribute1ReceiptPaymentPurposeCode: expect.any(Object),
            attribute1ReceiptPaymentPurposeType: expect.any(Object),
            attribute2ReceiptPaymentPurposeCode: expect.any(Object),
            attribute2ReceiptPaymentPurposeDescription: expect.any(Object),
            attribute3ReceiptPaymentPurposeCode: expect.any(Object),
            attribute3ReceiptPaymentPurposeDescription: expect.any(Object),
            attribute4ReceiptPaymentPurposeCode: expect.any(Object),
            attribute4ReceiptPaymentPurposeDescription: expect.any(Object),
            attribute5ReceiptPaymentPurposeCode: expect.any(Object),
            attribute5ReceiptPaymentPurposeDescription: expect.any(Object),
            lastChild: expect.any(Object),
          })
        );
      });
    });

    describe('getFxReceiptPurposeType', () => {
      it('should return NewFxReceiptPurposeType for default FxReceiptPurposeType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFxReceiptPurposeTypeFormGroup(sampleWithNewData);

        const fxReceiptPurposeType = service.getFxReceiptPurposeType(formGroup) as any;

        expect(fxReceiptPurposeType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFxReceiptPurposeType for empty FxReceiptPurposeType initial value', () => {
        const formGroup = service.createFxReceiptPurposeTypeFormGroup();

        const fxReceiptPurposeType = service.getFxReceiptPurposeType(formGroup) as any;

        expect(fxReceiptPurposeType).toMatchObject({});
      });

      it('should return IFxReceiptPurposeType', () => {
        const formGroup = service.createFxReceiptPurposeTypeFormGroup(sampleWithRequiredData);

        const fxReceiptPurposeType = service.getFxReceiptPurposeType(formGroup) as any;

        expect(fxReceiptPurposeType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFxReceiptPurposeType should not enable id FormControl', () => {
        const formGroup = service.createFxReceiptPurposeTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFxReceiptPurposeType should disable id FormControl', () => {
        const formGroup = service.createFxReceiptPurposeTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
