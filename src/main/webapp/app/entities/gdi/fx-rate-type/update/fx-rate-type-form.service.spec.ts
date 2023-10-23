import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fx-rate-type.test-samples';

import { FxRateTypeFormService } from './fx-rate-type-form.service';

describe('FxRateType Form Service', () => {
  let service: FxRateTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxRateTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFxRateTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFxRateTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxRateCode: expect.any(Object),
            fxRateType: expect.any(Object),
            fxRateDetails: expect.any(Object),
          })
        );
      });

      it('passing IFxRateType should create a new form with FormGroup', () => {
        const formGroup = service.createFxRateTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fxRateCode: expect.any(Object),
            fxRateType: expect.any(Object),
            fxRateDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getFxRateType', () => {
      it('should return NewFxRateType for default FxRateType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFxRateTypeFormGroup(sampleWithNewData);

        const fxRateType = service.getFxRateType(formGroup) as any;

        expect(fxRateType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFxRateType for empty FxRateType initial value', () => {
        const formGroup = service.createFxRateTypeFormGroup();

        const fxRateType = service.getFxRateType(formGroup) as any;

        expect(fxRateType).toMatchObject({});
      });

      it('should return IFxRateType', () => {
        const formGroup = service.createFxRateTypeFormGroup(sampleWithRequiredData);

        const fxRateType = service.getFxRateType(formGroup) as any;

        expect(fxRateType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFxRateType should not enable id FormControl', () => {
        const formGroup = service.createFxRateTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFxRateType should disable id FormControl', () => {
        const formGroup = service.createFxRateTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
