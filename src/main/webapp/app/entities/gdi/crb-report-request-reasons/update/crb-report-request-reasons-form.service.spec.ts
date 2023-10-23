import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-report-request-reasons.test-samples';

import { CrbReportRequestReasonsFormService } from './crb-report-request-reasons-form.service';

describe('CrbReportRequestReasons Form Service', () => {
  let service: CrbReportRequestReasonsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbReportRequestReasonsFormService);
  });

  describe('Service methods', () => {
    describe('createCrbReportRequestReasonsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbReportRequestReasonsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditReportRequestReasonTypeCode: expect.any(Object),
            creditReportRequestReasonType: expect.any(Object),
            creditReportRequestDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbReportRequestReasons should create a new form with FormGroup', () => {
        const formGroup = service.createCrbReportRequestReasonsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditReportRequestReasonTypeCode: expect.any(Object),
            creditReportRequestReasonType: expect.any(Object),
            creditReportRequestDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbReportRequestReasons', () => {
      it('should return NewCrbReportRequestReasons for default CrbReportRequestReasons initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbReportRequestReasonsFormGroup(sampleWithNewData);

        const crbReportRequestReasons = service.getCrbReportRequestReasons(formGroup) as any;

        expect(crbReportRequestReasons).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbReportRequestReasons for empty CrbReportRequestReasons initial value', () => {
        const formGroup = service.createCrbReportRequestReasonsFormGroup();

        const crbReportRequestReasons = service.getCrbReportRequestReasons(formGroup) as any;

        expect(crbReportRequestReasons).toMatchObject({});
      });

      it('should return ICrbReportRequestReasons', () => {
        const formGroup = service.createCrbReportRequestReasonsFormGroup(sampleWithRequiredData);

        const crbReportRequestReasons = service.getCrbReportRequestReasons(formGroup) as any;

        expect(crbReportRequestReasons).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbReportRequestReasons should not enable id FormControl', () => {
        const formGroup = service.createCrbReportRequestReasonsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbReportRequestReasons should disable id FormControl', () => {
        const formGroup = service.createCrbReportRequestReasonsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
