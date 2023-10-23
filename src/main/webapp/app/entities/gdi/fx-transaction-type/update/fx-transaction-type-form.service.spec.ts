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
