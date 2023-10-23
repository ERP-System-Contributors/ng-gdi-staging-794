import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-amount-category-band.test-samples';

import { CrbAmountCategoryBandFormService } from './crb-amount-category-band-form.service';

describe('CrbAmountCategoryBand Form Service', () => {
  let service: CrbAmountCategoryBandFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbAmountCategoryBandFormService);
  });

  describe('Service methods', () => {
    describe('createCrbAmountCategoryBandFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amountCategoryBandCode: expect.any(Object),
            amountCategoryBand: expect.any(Object),
            amountCategoryBandDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbAmountCategoryBand should create a new form with FormGroup', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amountCategoryBandCode: expect.any(Object),
            amountCategoryBand: expect.any(Object),
            amountCategoryBandDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbAmountCategoryBand', () => {
      it('should return NewCrbAmountCategoryBand for default CrbAmountCategoryBand initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithNewData);

        const crbAmountCategoryBand = service.getCrbAmountCategoryBand(formGroup) as any;

        expect(crbAmountCategoryBand).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbAmountCategoryBand for empty CrbAmountCategoryBand initial value', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup();

        const crbAmountCategoryBand = service.getCrbAmountCategoryBand(formGroup) as any;

        expect(crbAmountCategoryBand).toMatchObject({});
      });

      it('should return ICrbAmountCategoryBand', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithRequiredData);

        const crbAmountCategoryBand = service.getCrbAmountCategoryBand(formGroup) as any;

        expect(crbAmountCategoryBand).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbAmountCategoryBand should not enable id FormControl', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbAmountCategoryBand should disable id FormControl', () => {
        const formGroup = service.createCrbAmountCategoryBandFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
