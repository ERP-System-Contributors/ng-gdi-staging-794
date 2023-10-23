import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../professional-qualification.test-samples';

import { ProfessionalQualificationFormService } from './professional-qualification-form.service';

describe('ProfessionalQualification Form Service', () => {
  let service: ProfessionalQualificationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalQualificationFormService);
  });

  describe('Service methods', () => {
    describe('createProfessionalQualificationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProfessionalQualificationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            professionalQualificationsCode: expect.any(Object),
            professionalQualificationsType: expect.any(Object),
            professionalQualificationsDetails: expect.any(Object),
          })
        );
      });

      it('passing IProfessionalQualification should create a new form with FormGroup', () => {
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            professionalQualificationsCode: expect.any(Object),
            professionalQualificationsType: expect.any(Object),
            professionalQualificationsDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getProfessionalQualification', () => {
      it('should return NewProfessionalQualification for default ProfessionalQualification initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithNewData);

        const professionalQualification = service.getProfessionalQualification(formGroup) as any;

        expect(professionalQualification).toMatchObject(sampleWithNewData);
      });

      it('should return NewProfessionalQualification for empty ProfessionalQualification initial value', () => {
        const formGroup = service.createProfessionalQualificationFormGroup();

        const professionalQualification = service.getProfessionalQualification(formGroup) as any;

        expect(professionalQualification).toMatchObject({});
      });

      it('should return IProfessionalQualification', () => {
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithRequiredData);

        const professionalQualification = service.getProfessionalQualification(formGroup) as any;

        expect(professionalQualification).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProfessionalQualification should not enable id FormControl', () => {
        const formGroup = service.createProfessionalQualificationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProfessionalQualification should disable id FormControl', () => {
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
