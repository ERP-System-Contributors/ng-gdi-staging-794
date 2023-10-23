import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../merchant-type.test-samples';

import { MerchantTypeFormService } from './merchant-type-form.service';

describe('MerchantType Form Service', () => {
  let service: MerchantTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantTypeFormService);
  });

  describe('Service methods', () => {
    describe('createMerchantTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMerchantTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            merchantTypeCode: expect.any(Object),
            merchantType: expect.any(Object),
            merchantTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IMerchantType should create a new form with FormGroup', () => {
        const formGroup = service.createMerchantTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            merchantTypeCode: expect.any(Object),
            merchantType: expect.any(Object),
            merchantTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getMerchantType', () => {
      it('should return NewMerchantType for default MerchantType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMerchantTypeFormGroup(sampleWithNewData);

        const merchantType = service.getMerchantType(formGroup) as any;

        expect(merchantType).toMatchObject(sampleWithNewData);
      });

      it('should return NewMerchantType for empty MerchantType initial value', () => {
        const formGroup = service.createMerchantTypeFormGroup();

        const merchantType = service.getMerchantType(formGroup) as any;

        expect(merchantType).toMatchObject({});
      });

      it('should return IMerchantType', () => {
        const formGroup = service.createMerchantTypeFormGroup(sampleWithRequiredData);

        const merchantType = service.getMerchantType(formGroup) as any;

        expect(merchantType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMerchantType should not enable id FormControl', () => {
        const formGroup = service.createMerchantTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMerchantType should disable id FormControl', () => {
        const formGroup = service.createMerchantTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
