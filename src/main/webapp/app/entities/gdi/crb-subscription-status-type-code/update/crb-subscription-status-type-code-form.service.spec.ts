import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-subscription-status-type-code.test-samples';

import { CrbSubscriptionStatusTypeCodeFormService } from './crb-subscription-status-type-code-form.service';

describe('CrbSubscriptionStatusTypeCode Form Service', () => {
  let service: CrbSubscriptionStatusTypeCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbSubscriptionStatusTypeCodeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbSubscriptionStatusTypeCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subscriptionStatusTypeCode: expect.any(Object),
            subscriptionStatusType: expect.any(Object),
            subscriptionStatusTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbSubscriptionStatusTypeCode should create a new form with FormGroup', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subscriptionStatusTypeCode: expect.any(Object),
            subscriptionStatusType: expect.any(Object),
            subscriptionStatusTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbSubscriptionStatusTypeCode', () => {
      it('should return NewCrbSubscriptionStatusTypeCode for default CrbSubscriptionStatusTypeCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithNewData);

        const crbSubscriptionStatusTypeCode = service.getCrbSubscriptionStatusTypeCode(formGroup) as any;

        expect(crbSubscriptionStatusTypeCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbSubscriptionStatusTypeCode for empty CrbSubscriptionStatusTypeCode initial value', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup();

        const crbSubscriptionStatusTypeCode = service.getCrbSubscriptionStatusTypeCode(formGroup) as any;

        expect(crbSubscriptionStatusTypeCode).toMatchObject({});
      });

      it('should return ICrbSubscriptionStatusTypeCode', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithRequiredData);

        const crbSubscriptionStatusTypeCode = service.getCrbSubscriptionStatusTypeCode(formGroup) as any;

        expect(crbSubscriptionStatusTypeCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbSubscriptionStatusTypeCode should not enable id FormControl', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbSubscriptionStatusTypeCode should disable id FormControl', () => {
        const formGroup = service.createCrbSubscriptionStatusTypeCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
