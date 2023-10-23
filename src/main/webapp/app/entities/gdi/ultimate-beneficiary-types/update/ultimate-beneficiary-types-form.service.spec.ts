import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ultimate-beneficiary-types.test-samples';

import { UltimateBeneficiaryTypesFormService } from './ultimate-beneficiary-types-form.service';

describe('UltimateBeneficiaryTypes Form Service', () => {
  let service: UltimateBeneficiaryTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltimateBeneficiaryTypesFormService);
  });

  describe('Service methods', () => {
    describe('createUltimateBeneficiaryTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ultimateBeneficiaryTypeCode: expect.any(Object),
            ultimateBeneficiaryType: expect.any(Object),
            ultimateBeneficiaryTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IUltimateBeneficiaryTypes should create a new form with FormGroup', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ultimateBeneficiaryTypeCode: expect.any(Object),
            ultimateBeneficiaryType: expect.any(Object),
            ultimateBeneficiaryTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getUltimateBeneficiaryTypes', () => {
      it('should return NewUltimateBeneficiaryTypes for default UltimateBeneficiaryTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithNewData);

        const ultimateBeneficiaryTypes = service.getUltimateBeneficiaryTypes(formGroup) as any;

        expect(ultimateBeneficiaryTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewUltimateBeneficiaryTypes for empty UltimateBeneficiaryTypes initial value', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup();

        const ultimateBeneficiaryTypes = service.getUltimateBeneficiaryTypes(formGroup) as any;

        expect(ultimateBeneficiaryTypes).toMatchObject({});
      });

      it('should return IUltimateBeneficiaryTypes', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithRequiredData);

        const ultimateBeneficiaryTypes = service.getUltimateBeneficiaryTypes(formGroup) as any;

        expect(ultimateBeneficiaryTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUltimateBeneficiaryTypes should not enable id FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUltimateBeneficiaryTypes should disable id FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
