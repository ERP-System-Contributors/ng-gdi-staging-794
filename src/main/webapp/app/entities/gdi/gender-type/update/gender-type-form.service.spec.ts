import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../gender-type.test-samples';

import { GenderTypeFormService } from './gender-type-form.service';

describe('GenderType Form Service', () => {
  let service: GenderTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderTypeFormService);
  });

  describe('Service methods', () => {
    describe('createGenderTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGenderTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            genderCode: expect.any(Object),
            genderType: expect.any(Object),
            genderDescription: expect.any(Object),
          })
        );
      });

      it('passing IGenderType should create a new form with FormGroup', () => {
        const formGroup = service.createGenderTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            genderCode: expect.any(Object),
            genderType: expect.any(Object),
            genderDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getGenderType', () => {
      it('should return NewGenderType for default GenderType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGenderTypeFormGroup(sampleWithNewData);

        const genderType = service.getGenderType(formGroup) as any;

        expect(genderType).toMatchObject(sampleWithNewData);
      });

      it('should return NewGenderType for empty GenderType initial value', () => {
        const formGroup = service.createGenderTypeFormGroup();

        const genderType = service.getGenderType(formGroup) as any;

        expect(genderType).toMatchObject({});
      });

      it('should return IGenderType', () => {
        const formGroup = service.createGenderTypeFormGroup(sampleWithRequiredData);

        const genderType = service.getGenderType(formGroup) as any;

        expect(genderType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGenderType should not enable id FormControl', () => {
        const formGroup = service.createGenderTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGenderType should disable id FormControl', () => {
        const formGroup = service.createGenderTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
