import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../derivative-underlying-asset.test-samples';

import { DerivativeUnderlyingAssetFormService } from './derivative-underlying-asset-form.service';

describe('DerivativeUnderlyingAsset Form Service', () => {
  let service: DerivativeUnderlyingAssetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DerivativeUnderlyingAssetFormService);
  });

  describe('Service methods', () => {
    describe('createDerivativeUnderlyingAssetFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDerivativeUnderlyingAssetFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            derivativeUnderlyingAssetTypeCode: expect.any(Object),
            financialDerivativeUnderlyingAssetType: expect.any(Object),
            derivativeUnderlyingAssetTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IDerivativeUnderlyingAsset should create a new form with FormGroup', () => {
        const formGroup = service.createDerivativeUnderlyingAssetFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            derivativeUnderlyingAssetTypeCode: expect.any(Object),
            financialDerivativeUnderlyingAssetType: expect.any(Object),
            derivativeUnderlyingAssetTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getDerivativeUnderlyingAsset', () => {
      it('should return NewDerivativeUnderlyingAsset for default DerivativeUnderlyingAsset initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDerivativeUnderlyingAssetFormGroup(sampleWithNewData);

        const derivativeUnderlyingAsset = service.getDerivativeUnderlyingAsset(formGroup) as any;

        expect(derivativeUnderlyingAsset).toMatchObject(sampleWithNewData);
      });

      it('should return NewDerivativeUnderlyingAsset for empty DerivativeUnderlyingAsset initial value', () => {
        const formGroup = service.createDerivativeUnderlyingAssetFormGroup();

        const derivativeUnderlyingAsset = service.getDerivativeUnderlyingAsset(formGroup) as any;

        expect(derivativeUnderlyingAsset).toMatchObject({});
      });

      it('should return IDerivativeUnderlyingAsset', () => {
        const formGroup = service.createDerivativeUnderlyingAssetFormGroup(sampleWithRequiredData);

        const derivativeUnderlyingAsset = service.getDerivativeUnderlyingAsset(formGroup) as any;

        expect(derivativeUnderlyingAsset).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDerivativeUnderlyingAsset should not enable id FormControl', () => {
        const formGroup = service.createDerivativeUnderlyingAssetFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDerivativeUnderlyingAsset should disable id FormControl', () => {
        const formGroup = service.createDerivativeUnderlyingAssetFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
