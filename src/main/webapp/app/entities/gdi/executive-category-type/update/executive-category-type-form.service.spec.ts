import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../executive-category-type.test-samples';

import { ExecutiveCategoryTypeFormService } from './executive-category-type-form.service';

describe('ExecutiveCategoryType Form Service', () => {
  let service: ExecutiveCategoryTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutiveCategoryTypeFormService);
  });

  describe('Service methods', () => {
    describe('createExecutiveCategoryTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createExecutiveCategoryTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            directorCategoryTypeCode: expect.any(Object),
            directorCategoryType: expect.any(Object),
            directorCategoryTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IExecutiveCategoryType should create a new form with FormGroup', () => {
        const formGroup = service.createExecutiveCategoryTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            directorCategoryTypeCode: expect.any(Object),
            directorCategoryType: expect.any(Object),
            directorCategoryTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getExecutiveCategoryType', () => {
      it('should return NewExecutiveCategoryType for default ExecutiveCategoryType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createExecutiveCategoryTypeFormGroup(sampleWithNewData);

        const executiveCategoryType = service.getExecutiveCategoryType(formGroup) as any;

        expect(executiveCategoryType).toMatchObject(sampleWithNewData);
      });

      it('should return NewExecutiveCategoryType for empty ExecutiveCategoryType initial value', () => {
        const formGroup = service.createExecutiveCategoryTypeFormGroup();

        const executiveCategoryType = service.getExecutiveCategoryType(formGroup) as any;

        expect(executiveCategoryType).toMatchObject({});
      });

      it('should return IExecutiveCategoryType', () => {
        const formGroup = service.createExecutiveCategoryTypeFormGroup(sampleWithRequiredData);

        const executiveCategoryType = service.getExecutiveCategoryType(formGroup) as any;

        expect(executiveCategoryType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IExecutiveCategoryType should not enable id FormControl', () => {
        const formGroup = service.createExecutiveCategoryTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewExecutiveCategoryType should disable id FormControl', () => {
        const formGroup = service.createExecutiveCategoryTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
