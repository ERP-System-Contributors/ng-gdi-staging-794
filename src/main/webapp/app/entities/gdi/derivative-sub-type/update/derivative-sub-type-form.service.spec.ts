import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../derivative-sub-type.test-samples';

import { DerivativeSubTypeFormService } from './derivative-sub-type-form.service';

describe('DerivativeSubType Form Service', () => {
  let service: DerivativeSubTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DerivativeSubTypeFormService);
  });

  describe('Service methods', () => {
    describe('createDerivativeSubTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            financialDerivativeSubTypeCode: expect.any(Object),
            financialDerivativeSubTye: expect.any(Object),
            financialDerivativeSubtypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IDerivativeSubType should create a new form with FormGroup', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            financialDerivativeSubTypeCode: expect.any(Object),
            financialDerivativeSubTye: expect.any(Object),
            financialDerivativeSubtypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getDerivativeSubType', () => {
      it('should return NewDerivativeSubType for default DerivativeSubType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithNewData);

        const derivativeSubType = service.getDerivativeSubType(formGroup) as any;

        expect(derivativeSubType).toMatchObject(sampleWithNewData);
      });

      it('should return NewDerivativeSubType for empty DerivativeSubType initial value', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup();

        const derivativeSubType = service.getDerivativeSubType(formGroup) as any;

        expect(derivativeSubType).toMatchObject({});
      });

      it('should return IDerivativeSubType', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithRequiredData);

        const derivativeSubType = service.getDerivativeSubType(formGroup) as any;

        expect(derivativeSubType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDerivativeSubType should not enable id FormControl', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDerivativeSubType should disable id FormControl', () => {
        const formGroup = service.createDerivativeSubTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
