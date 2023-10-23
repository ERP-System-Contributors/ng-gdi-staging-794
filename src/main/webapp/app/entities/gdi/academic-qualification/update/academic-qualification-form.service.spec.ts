import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../academic-qualification.test-samples';

import { AcademicQualificationFormService } from './academic-qualification-form.service';

describe('AcademicQualification Form Service', () => {
  let service: AcademicQualificationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicQualificationFormService);
  });

  describe('Service methods', () => {
    describe('createAcademicQualificationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAcademicQualificationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            academicQualificationsCode: expect.any(Object),
            academicQualificationType: expect.any(Object),
            academicQualificationTypeDetail: expect.any(Object),
          })
        );
      });

      it('passing IAcademicQualification should create a new form with FormGroup', () => {
        const formGroup = service.createAcademicQualificationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            academicQualificationsCode: expect.any(Object),
            academicQualificationType: expect.any(Object),
            academicQualificationTypeDetail: expect.any(Object),
          })
        );
      });
    });

    describe('getAcademicQualification', () => {
      it('should return NewAcademicQualification for default AcademicQualification initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAcademicQualificationFormGroup(sampleWithNewData);

        const academicQualification = service.getAcademicQualification(formGroup) as any;

        expect(academicQualification).toMatchObject(sampleWithNewData);
      });

      it('should return NewAcademicQualification for empty AcademicQualification initial value', () => {
        const formGroup = service.createAcademicQualificationFormGroup();

        const academicQualification = service.getAcademicQualification(formGroup) as any;

        expect(academicQualification).toMatchObject({});
      });

      it('should return IAcademicQualification', () => {
        const formGroup = service.createAcademicQualificationFormGroup(sampleWithRequiredData);

        const academicQualification = service.getAcademicQualification(formGroup) as any;

        expect(academicQualification).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAcademicQualification should not enable id FormControl', () => {
        const formGroup = service.createAcademicQualificationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAcademicQualification should disable id FormControl', () => {
        const formGroup = service.createAcademicQualificationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
