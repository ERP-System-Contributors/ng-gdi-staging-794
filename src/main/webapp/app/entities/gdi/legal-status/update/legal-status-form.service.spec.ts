import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../legal-status.test-samples';

import { LegalStatusFormService } from './legal-status-form.service';

describe('LegalStatus Form Service', () => {
  let service: LegalStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalStatusFormService);
  });

  describe('Service methods', () => {
    describe('createLegalStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLegalStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            legalStatusCode: expect.any(Object),
            legalStatusType: expect.any(Object),
            legalStatusDescription: expect.any(Object),
          })
        );
      });

      it('passing ILegalStatus should create a new form with FormGroup', () => {
        const formGroup = service.createLegalStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            legalStatusCode: expect.any(Object),
            legalStatusType: expect.any(Object),
            legalStatusDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getLegalStatus', () => {
      it('should return NewLegalStatus for default LegalStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLegalStatusFormGroup(sampleWithNewData);

        const legalStatus = service.getLegalStatus(formGroup) as any;

        expect(legalStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewLegalStatus for empty LegalStatus initial value', () => {
        const formGroup = service.createLegalStatusFormGroup();

        const legalStatus = service.getLegalStatus(formGroup) as any;

        expect(legalStatus).toMatchObject({});
      });

      it('should return ILegalStatus', () => {
        const formGroup = service.createLegalStatusFormGroup(sampleWithRequiredData);

        const legalStatus = service.getLegalStatus(formGroup) as any;

        expect(legalStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILegalStatus should not enable id FormControl', () => {
        const formGroup = service.createLegalStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLegalStatus should disable id FormControl', () => {
        const formGroup = service.createLegalStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
