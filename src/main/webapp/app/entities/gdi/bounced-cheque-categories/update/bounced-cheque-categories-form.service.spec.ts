import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bounced-cheque-categories.test-samples';

import { BouncedChequeCategoriesFormService } from './bounced-cheque-categories-form.service';

describe('BouncedChequeCategories Form Service', () => {
  let service: BouncedChequeCategoriesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouncedChequeCategoriesFormService);
  });

  describe('Service methods', () => {
    describe('createBouncedChequeCategoriesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bouncedChequeCategoryTypeCode: expect.any(Object),
            bouncedChequeCategoryType: expect.any(Object),
          })
        );
      });

      it('passing IBouncedChequeCategories should create a new form with FormGroup', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bouncedChequeCategoryTypeCode: expect.any(Object),
            bouncedChequeCategoryType: expect.any(Object),
          })
        );
      });
    });

    describe('getBouncedChequeCategories', () => {
      it('should return NewBouncedChequeCategories for default BouncedChequeCategories initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithNewData);

        const bouncedChequeCategories = service.getBouncedChequeCategories(formGroup) as any;

        expect(bouncedChequeCategories).toMatchObject(sampleWithNewData);
      });

      it('should return NewBouncedChequeCategories for empty BouncedChequeCategories initial value', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup();

        const bouncedChequeCategories = service.getBouncedChequeCategories(formGroup) as any;

        expect(bouncedChequeCategories).toMatchObject({});
      });

      it('should return IBouncedChequeCategories', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithRequiredData);

        const bouncedChequeCategories = service.getBouncedChequeCategories(formGroup) as any;

        expect(bouncedChequeCategories).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBouncedChequeCategories should not enable id FormControl', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBouncedChequeCategories should disable id FormControl', () => {
        const formGroup = service.createBouncedChequeCategoriesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
