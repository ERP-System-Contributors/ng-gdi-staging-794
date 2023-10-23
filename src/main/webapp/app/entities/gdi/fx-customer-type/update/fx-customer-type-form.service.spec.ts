import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fx-customer-type.test-samples';

import { FxCustomerTypeFormService } from './fx-customer-type-form.service';

describe('FxCustomerType Form Service', () => {
  let service: FxCustomerTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxCustomerTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFxCustomerTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFxCustomerTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            foreignExchangeCustomerTypeCode: expect.any(Object),
            foreignCustomerType: expect.any(Object),
          })
        );
      });

      it('passing IFxCustomerType should create a new form with FormGroup', () => {
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            foreignExchangeCustomerTypeCode: expect.any(Object),
            foreignCustomerType: expect.any(Object),
          })
        );
      });
    });

    describe('getFxCustomerType', () => {
      it('should return NewFxCustomerType for default FxCustomerType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithNewData);

        const fxCustomerType = service.getFxCustomerType(formGroup) as any;

        expect(fxCustomerType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFxCustomerType for empty FxCustomerType initial value', () => {
        const formGroup = service.createFxCustomerTypeFormGroup();

        const fxCustomerType = service.getFxCustomerType(formGroup) as any;

        expect(fxCustomerType).toMatchObject({});
      });

      it('should return IFxCustomerType', () => {
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithRequiredData);

        const fxCustomerType = service.getFxCustomerType(formGroup) as any;

        expect(fxCustomerType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFxCustomerType should not enable id FormControl', () => {
        const formGroup = service.createFxCustomerTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFxCustomerType should disable id FormControl', () => {
        const formGroup = service.createFxCustomerTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
