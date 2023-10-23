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
