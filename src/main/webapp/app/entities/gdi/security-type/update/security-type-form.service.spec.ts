import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../security-type.test-samples';

import { SecurityTypeFormService } from './security-type-form.service';

describe('SecurityType Form Service', () => {
  let service: SecurityTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityTypeFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityTypeCode: expect.any(Object),
            securityType: expect.any(Object),
            securityTypeDetails: expect.any(Object),
            securityTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ISecurityType should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityTypeCode: expect.any(Object),
            securityType: expect.any(Object),
            securityTypeDetails: expect.any(Object),
            securityTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getSecurityType', () => {
      it('should return NewSecurityType for default SecurityType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecurityTypeFormGroup(sampleWithNewData);

        const securityType = service.getSecurityType(formGroup) as any;

        expect(securityType).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityType for empty SecurityType initial value', () => {
        const formGroup = service.createSecurityTypeFormGroup();

        const securityType = service.getSecurityType(formGroup) as any;

        expect(securityType).toMatchObject({});
      });

      it('should return ISecurityType', () => {
        const formGroup = service.createSecurityTypeFormGroup(sampleWithRequiredData);

        const securityType = service.getSecurityType(formGroup) as any;

        expect(securityType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityType should not enable id FormControl', () => {
        const formGroup = service.createSecurityTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityType should disable id FormControl', () => {
        const formGroup = service.createSecurityTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
