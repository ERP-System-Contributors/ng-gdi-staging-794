import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fraud-category-flag.test-samples';

import { FraudCategoryFlagFormService } from './fraud-category-flag-form.service';

describe('FraudCategoryFlag Form Service', () => {
  let service: FraudCategoryFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraudCategoryFlagFormService);
  });

  describe('Service methods', () => {
    describe('createFraudCategoryFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fraudCategoryFlag: expect.any(Object),
            fraudCategoryTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IFraudCategoryFlag should create a new form with FormGroup', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fraudCategoryFlag: expect.any(Object),
            fraudCategoryTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getFraudCategoryFlag', () => {
      it('should return NewFraudCategoryFlag for default FraudCategoryFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithNewData);

        const fraudCategoryFlag = service.getFraudCategoryFlag(formGroup) as any;

        expect(fraudCategoryFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewFraudCategoryFlag for empty FraudCategoryFlag initial value', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup();

        const fraudCategoryFlag = service.getFraudCategoryFlag(formGroup) as any;

        expect(fraudCategoryFlag).toMatchObject({});
      });

      it('should return IFraudCategoryFlag', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithRequiredData);

        const fraudCategoryFlag = service.getFraudCategoryFlag(formGroup) as any;

        expect(fraudCategoryFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFraudCategoryFlag should not enable id FormControl', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFraudCategoryFlag should disable id FormControl', () => {
        const formGroup = service.createFraudCategoryFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
