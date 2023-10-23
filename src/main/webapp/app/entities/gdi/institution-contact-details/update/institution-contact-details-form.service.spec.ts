import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../institution-contact-details.test-samples';

import { InstitutionContactDetailsFormService } from './institution-contact-details-form.service';

describe('InstitutionContactDetails Form Service', () => {
  let service: InstitutionContactDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionContactDetailsFormService);
  });

  describe('Service methods', () => {
    describe('createInstitutionContactDetailsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInstitutionContactDetailsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            entityId: expect.any(Object),
            entityName: expect.any(Object),
            contactType: expect.any(Object),
            contactLevel: expect.any(Object),
            contactValue: expect.any(Object),
            contactName: expect.any(Object),
            contactDesignation: expect.any(Object),
          })
        );
      });

      it('passing IInstitutionContactDetails should create a new form with FormGroup', () => {
        const formGroup = service.createInstitutionContactDetailsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            entityId: expect.any(Object),
            entityName: expect.any(Object),
            contactType: expect.any(Object),
            contactLevel: expect.any(Object),
            contactValue: expect.any(Object),
            contactName: expect.any(Object),
            contactDesignation: expect.any(Object),
          })
        );
      });
    });

    describe('getInstitutionContactDetails', () => {
      it('should return NewInstitutionContactDetails for default InstitutionContactDetails initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInstitutionContactDetailsFormGroup(sampleWithNewData);

        const institutionContactDetails = service.getInstitutionContactDetails(formGroup) as any;

        expect(institutionContactDetails).toMatchObject(sampleWithNewData);
      });

      it('should return NewInstitutionContactDetails for empty InstitutionContactDetails initial value', () => {
        const formGroup = service.createInstitutionContactDetailsFormGroup();

        const institutionContactDetails = service.getInstitutionContactDetails(formGroup) as any;

        expect(institutionContactDetails).toMatchObject({});
      });

      it('should return IInstitutionContactDetails', () => {
        const formGroup = service.createInstitutionContactDetailsFormGroup(sampleWithRequiredData);

        const institutionContactDetails = service.getInstitutionContactDetails(formGroup) as any;

        expect(institutionContactDetails).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInstitutionContactDetails should not enable id FormControl', () => {
        const formGroup = service.createInstitutionContactDetailsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInstitutionContactDetails should disable id FormControl', () => {
        const formGroup = service.createInstitutionContactDetailsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
