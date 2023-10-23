import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../institution-status-type.test-samples';

import { InstitutionStatusTypeFormService } from './institution-status-type-form.service';

describe('InstitutionStatusType Form Service', () => {
  let service: InstitutionStatusTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionStatusTypeFormService);
  });

  describe('Service methods', () => {
    describe('createInstitutionStatusTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionStatusCode: expect.any(Object),
            institutionStatusType: expect.any(Object),
            insitutionStatusTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IInstitutionStatusType should create a new form with FormGroup', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionStatusCode: expect.any(Object),
            institutionStatusType: expect.any(Object),
            insitutionStatusTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getInstitutionStatusType', () => {
      it('should return NewInstitutionStatusType for default InstitutionStatusType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithNewData);

        const institutionStatusType = service.getInstitutionStatusType(formGroup) as any;

        expect(institutionStatusType).toMatchObject(sampleWithNewData);
      });

      it('should return NewInstitutionStatusType for empty InstitutionStatusType initial value', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup();

        const institutionStatusType = service.getInstitutionStatusType(formGroup) as any;

        expect(institutionStatusType).toMatchObject({});
      });

      it('should return IInstitutionStatusType', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithRequiredData);

        const institutionStatusType = service.getInstitutionStatusType(formGroup) as any;

        expect(institutionStatusType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInstitutionStatusType should not enable id FormControl', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInstitutionStatusType should disable id FormControl', () => {
        const formGroup = service.createInstitutionStatusTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
