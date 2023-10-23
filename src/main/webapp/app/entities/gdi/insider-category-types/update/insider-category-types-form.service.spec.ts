import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../insider-category-types.test-samples';

import { InsiderCategoryTypesFormService } from './insider-category-types-form.service';

describe('InsiderCategoryTypes Form Service', () => {
  let service: InsiderCategoryTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsiderCategoryTypesFormService);
  });

  describe('Service methods', () => {
    describe('createInsiderCategoryTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            insiderCategoryTypeCode: expect.any(Object),
            insiderCategoryTypeDetail: expect.any(Object),
            insiderCategoryDescription: expect.any(Object),
          })
        );
      });

      it('passing IInsiderCategoryTypes should create a new form with FormGroup', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            insiderCategoryTypeCode: expect.any(Object),
            insiderCategoryTypeDetail: expect.any(Object),
            insiderCategoryDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getInsiderCategoryTypes', () => {
      it('should return NewInsiderCategoryTypes for default InsiderCategoryTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithNewData);

        const insiderCategoryTypes = service.getInsiderCategoryTypes(formGroup) as any;

        expect(insiderCategoryTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewInsiderCategoryTypes for empty InsiderCategoryTypes initial value', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup();

        const insiderCategoryTypes = service.getInsiderCategoryTypes(formGroup) as any;

        expect(insiderCategoryTypes).toMatchObject({});
      });

      it('should return IInsiderCategoryTypes', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithRequiredData);

        const insiderCategoryTypes = service.getInsiderCategoryTypes(formGroup) as any;

        expect(insiderCategoryTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInsiderCategoryTypes should not enable id FormControl', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInsiderCategoryTypes should disable id FormControl', () => {
        const formGroup = service.createInsiderCategoryTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
