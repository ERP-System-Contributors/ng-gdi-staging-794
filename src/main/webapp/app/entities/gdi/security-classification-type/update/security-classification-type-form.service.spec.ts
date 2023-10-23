import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../security-classification-type.test-samples';

import { SecurityClassificationTypeFormService } from './security-classification-type-form.service';

describe('SecurityClassificationType Form Service', () => {
  let service: SecurityClassificationTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityClassificationTypeFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityClassificationTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityClassificationTypeCode: expect.any(Object),
            securityClassificationType: expect.any(Object),
            securityClassificationDetails: expect.any(Object),
          })
        );
      });

      it('passing ISecurityClassificationType should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityClassificationTypeCode: expect.any(Object),
            securityClassificationType: expect.any(Object),
            securityClassificationDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getSecurityClassificationType', () => {
      it('should return NewSecurityClassificationType for default SecurityClassificationType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithNewData);

        const securityClassificationType = service.getSecurityClassificationType(formGroup) as any;

        expect(securityClassificationType).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityClassificationType for empty SecurityClassificationType initial value', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup();

        const securityClassificationType = service.getSecurityClassificationType(formGroup) as any;

        expect(securityClassificationType).toMatchObject({});
      });

      it('should return ISecurityClassificationType', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithRequiredData);

        const securityClassificationType = service.getSecurityClassificationType(formGroup) as any;

        expect(securityClassificationType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityClassificationType should not enable id FormControl', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityClassificationType should disable id FormControl', () => {
        const formGroup = service.createSecurityClassificationTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
