import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../category-of-security.test-samples';

import { CategoryOfSecurityFormService } from './category-of-security-form.service';

describe('CategoryOfSecurity Form Service', () => {
  let service: CategoryOfSecurityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryOfSecurityFormService);
  });

  describe('Service methods', () => {
    describe('createCategoryOfSecurityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryOfSecurity: expect.any(Object),
            categoryOfSecurityDetails: expect.any(Object),
            categoryOfSecurityDescription: expect.any(Object),
          })
        );
      });

      it('passing ICategoryOfSecurity should create a new form with FormGroup', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryOfSecurity: expect.any(Object),
            categoryOfSecurityDetails: expect.any(Object),
            categoryOfSecurityDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCategoryOfSecurity', () => {
      it('should return NewCategoryOfSecurity for default CategoryOfSecurity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithNewData);

        const categoryOfSecurity = service.getCategoryOfSecurity(formGroup) as any;

        expect(categoryOfSecurity).toMatchObject(sampleWithNewData);
      });

      it('should return NewCategoryOfSecurity for empty CategoryOfSecurity initial value', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup();

        const categoryOfSecurity = service.getCategoryOfSecurity(formGroup) as any;

        expect(categoryOfSecurity).toMatchObject({});
      });

      it('should return ICategoryOfSecurity', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithRequiredData);

        const categoryOfSecurity = service.getCategoryOfSecurity(formGroup) as any;

        expect(categoryOfSecurity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICategoryOfSecurity should not enable id FormControl', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCategoryOfSecurity should disable id FormControl', () => {
        const formGroup = service.createCategoryOfSecurityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
