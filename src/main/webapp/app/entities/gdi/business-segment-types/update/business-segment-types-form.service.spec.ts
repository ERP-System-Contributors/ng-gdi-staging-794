import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../business-segment-types.test-samples';

import { BusinessSegmentTypesFormService } from './business-segment-types-form.service';

describe('BusinessSegmentTypes Form Service', () => {
  let service: BusinessSegmentTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessSegmentTypesFormService);
  });

  describe('Service methods', () => {
    describe('createBusinessSegmentTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBusinessSegmentTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessEconomicSegmentCode: expect.any(Object),
            businessEconomicSegment: expect.any(Object),
            details: expect.any(Object),
          })
        );
      });

      it('passing IBusinessSegmentTypes should create a new form with FormGroup', () => {
        const formGroup = service.createBusinessSegmentTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessEconomicSegmentCode: expect.any(Object),
            businessEconomicSegment: expect.any(Object),
            details: expect.any(Object),
          })
        );
      });
    });

    describe('getBusinessSegmentTypes', () => {
      it('should return NewBusinessSegmentTypes for default BusinessSegmentTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBusinessSegmentTypesFormGroup(sampleWithNewData);

        const businessSegmentTypes = service.getBusinessSegmentTypes(formGroup) as any;

        expect(businessSegmentTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewBusinessSegmentTypes for empty BusinessSegmentTypes initial value', () => {
        const formGroup = service.createBusinessSegmentTypesFormGroup();

        const businessSegmentTypes = service.getBusinessSegmentTypes(formGroup) as any;

        expect(businessSegmentTypes).toMatchObject({});
      });

      it('should return IBusinessSegmentTypes', () => {
        const formGroup = service.createBusinessSegmentTypesFormGroup(sampleWithRequiredData);

        const businessSegmentTypes = service.getBusinessSegmentTypes(formGroup) as any;

        expect(businessSegmentTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBusinessSegmentTypes should not enable id FormControl', () => {
        const formGroup = service.createBusinessSegmentTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBusinessSegmentTypes should disable id FormControl', () => {
        const formGroup = service.createBusinessSegmentTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
