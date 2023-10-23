import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../agricultural-enterprise-activity-type.test-samples';

import { AgriculturalEnterpriseActivityTypeFormService } from './agricultural-enterprise-activity-type-form.service';

describe('AgriculturalEnterpriseActivityType Form Service', () => {
  let service: AgriculturalEnterpriseActivityTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgriculturalEnterpriseActivityTypeFormService);
  });

  describe('Service methods', () => {
    describe('createAgriculturalEnterpriseActivityTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAgriculturalEnterpriseActivityTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            agriculturalEnterpriseActivityTypeCode: expect.any(Object),
            agriculturalEnterpriseActivityType: expect.any(Object),
            agriculturalEnterpriseActivityTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IAgriculturalEnterpriseActivityType should create a new form with FormGroup', () => {
        const formGroup = service.createAgriculturalEnterpriseActivityTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            agriculturalEnterpriseActivityTypeCode: expect.any(Object),
            agriculturalEnterpriseActivityType: expect.any(Object),
            agriculturalEnterpriseActivityTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getAgriculturalEnterpriseActivityType', () => {
      it('should return NewAgriculturalEnterpriseActivityType for default AgriculturalEnterpriseActivityType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAgriculturalEnterpriseActivityTypeFormGroup(sampleWithNewData);

        const agriculturalEnterpriseActivityType = service.getAgriculturalEnterpriseActivityType(formGroup) as any;

        expect(agriculturalEnterpriseActivityType).toMatchObject(sampleWithNewData);
      });

      it('should return NewAgriculturalEnterpriseActivityType for empty AgriculturalEnterpriseActivityType initial value', () => {
        const formGroup = service.createAgriculturalEnterpriseActivityTypeFormGroup();

        const agriculturalEnterpriseActivityType = service.getAgriculturalEnterpriseActivityType(formGroup) as any;

        expect(agriculturalEnterpriseActivityType).toMatchObject({});
      });

      it('should return IAgriculturalEnterpriseActivityType', () => {
        const formGroup = service.createAgriculturalEnterpriseActivityTypeFormGroup(sampleWithRequiredData);

        const agriculturalEnterpriseActivityType = service.getAgriculturalEnterpriseActivityType(formGroup) as any;

        expect(agriculturalEnterpriseActivityType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAgriculturalEnterpriseActivityType should not enable id FormControl', () => {
        const formGroup = service.createAgriculturalEnterpriseActivityTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAgriculturalEnterpriseActivityType should disable id FormControl', () => {
        const formGroup = service.createAgriculturalEnterpriseActivityTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
