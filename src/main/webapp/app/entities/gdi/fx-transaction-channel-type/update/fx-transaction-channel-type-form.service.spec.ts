import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fx-transaction-channel-type.test-samples';

import { FxTransactionChannelTypeFormService } from './fx-transaction-channel-type-form.service';

describe('FxTransactionChannelType Form Service', () => {
  let service: FxTransactionChannelTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxTransactionChannelTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFxTransactionChannelTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFxTransactionChannelTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxTransactionChannelCode: expect.any(Object),
            fxTransactionChannelType: expect.any(Object),
            fxChannelTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IFxTransactionChannelType should create a new form with FormGroup', () => {
        const formGroup = service.createFxTransactionChannelTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxTransactionChannelCode: expect.any(Object),
            fxTransactionChannelType: expect.any(Object),
            fxChannelTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getFxTransactionChannelType', () => {
      it('should return NewFxTransactionChannelType for default FxTransactionChannelType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFxTransactionChannelTypeFormGroup(sampleWithNewData);

        const fxTransactionChannelType = service.getFxTransactionChannelType(formGroup) as any;

        expect(fxTransactionChannelType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFxTransactionChannelType for empty FxTransactionChannelType initial value', () => {
        const formGroup = service.createFxTransactionChannelTypeFormGroup();

        const fxTransactionChannelType = service.getFxTransactionChannelType(formGroup) as any;

        expect(fxTransactionChannelType).toMatchObject({});
      });

      it('should return IFxTransactionChannelType', () => {
        const formGroup = service.createFxTransactionChannelTypeFormGroup(sampleWithRequiredData);

        const fxTransactionChannelType = service.getFxTransactionChannelType(formGroup) as any;

        expect(fxTransactionChannelType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFxTransactionChannelType should not enable id FormControl', () => {
        const formGroup = service.createFxTransactionChannelTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFxTransactionChannelType should disable id FormControl', () => {
        const formGroup = service.createFxTransactionChannelTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
