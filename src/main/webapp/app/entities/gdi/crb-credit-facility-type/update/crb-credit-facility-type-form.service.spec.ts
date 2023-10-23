import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-credit-facility-type.test-samples';

import { CrbCreditFacilityTypeFormService } from './crb-credit-facility-type-form.service';

describe('CrbCreditFacilityType Form Service', () => {
  let service: CrbCreditFacilityTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbCreditFacilityTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbCreditFacilityTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbCreditFacilityTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditFacilityTypeCode: expect.any(Object),
            creditFacilityType: expect.any(Object),
            creditFacilityDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbCreditFacilityType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbCreditFacilityTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditFacilityTypeCode: expect.any(Object),
            creditFacilityType: expect.any(Object),
            creditFacilityDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbCreditFacilityType', () => {
      it('should return NewCrbCreditFacilityType for default CrbCreditFacilityType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbCreditFacilityTypeFormGroup(sampleWithNewData);

        const crbCreditFacilityType = service.getCrbCreditFacilityType(formGroup) as any;

        expect(crbCreditFacilityType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbCreditFacilityType for empty CrbCreditFacilityType initial value', () => {
        const formGroup = service.createCrbCreditFacilityTypeFormGroup();

        const crbCreditFacilityType = service.getCrbCreditFacilityType(formGroup) as any;

        expect(crbCreditFacilityType).toMatchObject({});
      });

      it('should return ICrbCreditFacilityType', () => {
        const formGroup = service.createCrbCreditFacilityTypeFormGroup(sampleWithRequiredData);

        const crbCreditFacilityType = service.getCrbCreditFacilityType(formGroup) as any;

        expect(crbCreditFacilityType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbCreditFacilityType should not enable id FormControl', () => {
        const formGroup = service.createCrbCreditFacilityTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbCreditFacilityType should disable id FormControl', () => {
        const formGroup = service.createCrbCreditFacilityTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
