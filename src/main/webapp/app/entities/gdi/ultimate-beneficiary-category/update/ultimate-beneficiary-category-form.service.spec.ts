import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ultimate-beneficiary-category.test-samples';

import { UltimateBeneficiaryCategoryFormService } from './ultimate-beneficiary-category-form.service';

describe('UltimateBeneficiaryCategory Form Service', () => {
  let service: UltimateBeneficiaryCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltimateBeneficiaryCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createUltimateBeneficiaryCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ultimateBeneficiaryCategoryTypeCode: expect.any(Object),
            ultimateBeneficiaryType: expect.any(Object),
            ultimateBeneficiaryCategoryTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IUltimateBeneficiaryCategory should create a new form with FormGroup', () => {
        const formGroup = service.createUltimateBeneficiaryCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ultimateBeneficiaryCategoryTypeCode: expect.any(Object),
            ultimateBeneficiaryType: expect.any(Object),
            ultimateBeneficiaryCategoryTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getUltimateBeneficiaryCategory', () => {
      it('should return NewUltimateBeneficiaryCategory for default UltimateBeneficiaryCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUltimateBeneficiaryCategoryFormGroup(sampleWithNewData);

        const ultimateBeneficiaryCategory = service.getUltimateBeneficiaryCategory(formGroup) as any;

        expect(ultimateBeneficiaryCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewUltimateBeneficiaryCategory for empty UltimateBeneficiaryCategory initial value', () => {
        const formGroup = service.createUltimateBeneficiaryCategoryFormGroup();

        const ultimateBeneficiaryCategory = service.getUltimateBeneficiaryCategory(formGroup) as any;

        expect(ultimateBeneficiaryCategory).toMatchObject({});
      });

      it('should return IUltimateBeneficiaryCategory', () => {
        const formGroup = service.createUltimateBeneficiaryCategoryFormGroup(sampleWithRequiredData);

        const ultimateBeneficiaryCategory = service.getUltimateBeneficiaryCategory(formGroup) as any;

        expect(ultimateBeneficiaryCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUltimateBeneficiaryCategory should not enable id FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUltimateBeneficiaryCategory should disable id FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
