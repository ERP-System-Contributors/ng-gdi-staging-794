import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-customer-type.test-samples';

import { CrbCustomerTypeFormService } from './crb-customer-type-form.service';

describe('CrbCustomerType Form Service', () => {
  let service: CrbCustomerTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbCustomerTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbCustomerTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbCustomerTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerTypeCode: expect.any(Object),
            customerType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing ICrbCustomerType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbCustomerTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerTypeCode: expect.any(Object),
            customerType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbCustomerType', () => {
      it('should return NewCrbCustomerType for default CrbCustomerType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbCustomerTypeFormGroup(sampleWithNewData);

        const crbCustomerType = service.getCrbCustomerType(formGroup) as any;

        expect(crbCustomerType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbCustomerType for empty CrbCustomerType initial value', () => {
        const formGroup = service.createCrbCustomerTypeFormGroup();

        const crbCustomerType = service.getCrbCustomerType(formGroup) as any;

        expect(crbCustomerType).toMatchObject({});
      });

      it('should return ICrbCustomerType', () => {
        const formGroup = service.createCrbCustomerTypeFormGroup(sampleWithRequiredData);

        const crbCustomerType = service.getCrbCustomerType(formGroup) as any;

        expect(crbCustomerType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbCustomerType should not enable id FormControl', () => {
        const formGroup = service.createCrbCustomerTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbCustomerType should disable id FormControl', () => {
        const formGroup = service.createCrbCustomerTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
