import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-product-service-fee-type.test-samples';

import { CrbProductServiceFeeTypeFormService } from './crb-product-service-fee-type-form.service';

describe('CrbProductServiceFeeType Form Service', () => {
  let service: CrbProductServiceFeeTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbProductServiceFeeTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbProductServiceFeeTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chargeTypeCode: expect.any(Object),
            chargeTypeDescription: expect.any(Object),
            chargeTypeCategory: expect.any(Object),
          })
        );
      });

      it('passing ICrbProductServiceFeeType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chargeTypeCode: expect.any(Object),
            chargeTypeDescription: expect.any(Object),
            chargeTypeCategory: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbProductServiceFeeType', () => {
      it('should return NewCrbProductServiceFeeType for default CrbProductServiceFeeType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithNewData);

        const crbProductServiceFeeType = service.getCrbProductServiceFeeType(formGroup) as any;

        expect(crbProductServiceFeeType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbProductServiceFeeType for empty CrbProductServiceFeeType initial value', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup();

        const crbProductServiceFeeType = service.getCrbProductServiceFeeType(formGroup) as any;

        expect(crbProductServiceFeeType).toMatchObject({});
      });

      it('should return ICrbProductServiceFeeType', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithRequiredData);

        const crbProductServiceFeeType = service.getCrbProductServiceFeeType(formGroup) as any;

        expect(crbProductServiceFeeType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbProductServiceFeeType should not enable id FormControl', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbProductServiceFeeType should disable id FormControl', () => {
        const formGroup = service.createCrbProductServiceFeeTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
