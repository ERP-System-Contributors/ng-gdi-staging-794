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
