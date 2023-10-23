import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-agent-service-type.test-samples';

import { CrbAgentServiceTypeFormService } from './crb-agent-service-type-form.service';

describe('CrbAgentServiceType Form Service', () => {
  let service: CrbAgentServiceTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbAgentServiceTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbAgentServiceTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbAgentServiceTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            agentServiceTypeCode: expect.any(Object),
            agentServiceTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbAgentServiceType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbAgentServiceTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            agentServiceTypeCode: expect.any(Object),
            agentServiceTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbAgentServiceType', () => {
      it('should return NewCrbAgentServiceType for default CrbAgentServiceType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbAgentServiceTypeFormGroup(sampleWithNewData);

        const crbAgentServiceType = service.getCrbAgentServiceType(formGroup) as any;

        expect(crbAgentServiceType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbAgentServiceType for empty CrbAgentServiceType initial value', () => {
        const formGroup = service.createCrbAgentServiceTypeFormGroup();

        const crbAgentServiceType = service.getCrbAgentServiceType(formGroup) as any;

        expect(crbAgentServiceType).toMatchObject({});
      });

      it('should return ICrbAgentServiceType', () => {
        const formGroup = service.createCrbAgentServiceTypeFormGroup(sampleWithRequiredData);

        const crbAgentServiceType = service.getCrbAgentServiceType(formGroup) as any;

        expect(crbAgentServiceType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbAgentServiceType should not enable id FormControl', () => {
        const formGroup = service.createCrbAgentServiceTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbAgentServiceType should disable id FormControl', () => {
        const formGroup = service.createCrbAgentServiceTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
