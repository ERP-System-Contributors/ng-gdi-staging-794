import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-submitting-institution-category.test-samples';

import { CrbSubmittingInstitutionCategoryFormService } from './crb-submitting-institution-category-form.service';

describe('CrbSubmittingInstitutionCategory Form Service', () => {
  let service: CrbSubmittingInstitutionCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbSubmittingInstitutionCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCrbSubmittingInstitutionCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submittingInstitutionCategoryTypeCode: expect.any(Object),
            submittingInstitutionCategoryType: expect.any(Object),
            submittingInstitutionCategoryDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbSubmittingInstitutionCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submittingInstitutionCategoryTypeCode: expect.any(Object),
            submittingInstitutionCategoryType: expect.any(Object),
            submittingInstitutionCategoryDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbSubmittingInstitutionCategory', () => {
      it('should return NewCrbSubmittingInstitutionCategory for default CrbSubmittingInstitutionCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithNewData);

        const crbSubmittingInstitutionCategory = service.getCrbSubmittingInstitutionCategory(formGroup) as any;

        expect(crbSubmittingInstitutionCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbSubmittingInstitutionCategory for empty CrbSubmittingInstitutionCategory initial value', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup();

        const crbSubmittingInstitutionCategory = service.getCrbSubmittingInstitutionCategory(formGroup) as any;

        expect(crbSubmittingInstitutionCategory).toMatchObject({});
      });

      it('should return ICrbSubmittingInstitutionCategory', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithRequiredData);

        const crbSubmittingInstitutionCategory = service.getCrbSubmittingInstitutionCategory(formGroup) as any;

        expect(crbSubmittingInstitutionCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbSubmittingInstitutionCategory should not enable id FormControl', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbSubmittingInstitutionCategory should disable id FormControl', () => {
        const formGroup = service.createCrbSubmittingInstitutionCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
