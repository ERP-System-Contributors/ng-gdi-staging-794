import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../security-tenure.test-samples';

import { SecurityTenureFormService } from './security-tenure-form.service';

describe('SecurityTenure Form Service', () => {
  let service: SecurityTenureFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityTenureFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityTenureFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityTenureFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityTenureCode: expect.any(Object),
            securityTenureType: expect.any(Object),
            securityTenureDetails: expect.any(Object),
          })
        );
      });

      it('passing ISecurityTenure should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityTenureFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            securityTenureCode: expect.any(Object),
            securityTenureType: expect.any(Object),
            securityTenureDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getSecurityTenure', () => {
      it('should return NewSecurityTenure for default SecurityTenure initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecurityTenureFormGroup(sampleWithNewData);

        const securityTenure = service.getSecurityTenure(formGroup) as any;

        expect(securityTenure).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityTenure for empty SecurityTenure initial value', () => {
        const formGroup = service.createSecurityTenureFormGroup();

        const securityTenure = service.getSecurityTenure(formGroup) as any;

        expect(securityTenure).toMatchObject({});
      });

      it('should return ISecurityTenure', () => {
        const formGroup = service.createSecurityTenureFormGroup(sampleWithRequiredData);

        const securityTenure = service.getSecurityTenure(formGroup) as any;

        expect(securityTenure).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityTenure should not enable id FormControl', () => {
        const formGroup = service.createSecurityTenureFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityTenure should disable id FormControl', () => {
        const formGroup = service.createSecurityTenureFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
