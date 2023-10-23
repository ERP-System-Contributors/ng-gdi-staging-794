import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-aging-bands.test-samples';

import { CrbAgingBandsFormService } from './crb-aging-bands-form.service';

describe('CrbAgingBands Form Service', () => {
  let service: CrbAgingBandsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbAgingBandsFormService);
  });

  describe('Service methods', () => {
    describe('createCrbAgingBandsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbAgingBandsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            agingBandCategoryCode: expect.any(Object),
            agingBandCategory: expect.any(Object),
            agingBandCategoryDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbAgingBands should create a new form with FormGroup', () => {
        const formGroup = service.createCrbAgingBandsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            agingBandCategoryCode: expect.any(Object),
            agingBandCategory: expect.any(Object),
            agingBandCategoryDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbAgingBands', () => {
      it('should return NewCrbAgingBands for default CrbAgingBands initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbAgingBandsFormGroup(sampleWithNewData);

        const crbAgingBands = service.getCrbAgingBands(formGroup) as any;

        expect(crbAgingBands).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbAgingBands for empty CrbAgingBands initial value', () => {
        const formGroup = service.createCrbAgingBandsFormGroup();

        const crbAgingBands = service.getCrbAgingBands(formGroup) as any;

        expect(crbAgingBands).toMatchObject({});
      });

      it('should return ICrbAgingBands', () => {
        const formGroup = service.createCrbAgingBandsFormGroup(sampleWithRequiredData);

        const crbAgingBands = service.getCrbAgingBands(formGroup) as any;

        expect(crbAgingBands).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbAgingBands should not enable id FormControl', () => {
        const formGroup = service.createCrbAgingBandsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbAgingBands should disable id FormControl', () => {
        const formGroup = service.createCrbAgingBandsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
