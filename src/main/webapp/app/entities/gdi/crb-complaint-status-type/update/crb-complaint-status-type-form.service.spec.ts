import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-complaint-status-type.test-samples';

import { CrbComplaintStatusTypeFormService } from './crb-complaint-status-type-form.service';

describe('CrbComplaintStatusType Form Service', () => {
  let service: CrbComplaintStatusTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbComplaintStatusTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbComplaintStatusTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbComplaintStatusTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            complaintStatusTypeCode: expect.any(Object),
            complaintStatusType: expect.any(Object),
            complaintStatusDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbComplaintStatusType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbComplaintStatusTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            complaintStatusTypeCode: expect.any(Object),
            complaintStatusType: expect.any(Object),
            complaintStatusDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbComplaintStatusType', () => {
      it('should return NewCrbComplaintStatusType for default CrbComplaintStatusType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbComplaintStatusTypeFormGroup(sampleWithNewData);

        const crbComplaintStatusType = service.getCrbComplaintStatusType(formGroup) as any;

        expect(crbComplaintStatusType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbComplaintStatusType for empty CrbComplaintStatusType initial value', () => {
        const formGroup = service.createCrbComplaintStatusTypeFormGroup();

        const crbComplaintStatusType = service.getCrbComplaintStatusType(formGroup) as any;

        expect(crbComplaintStatusType).toMatchObject({});
      });

      it('should return ICrbComplaintStatusType', () => {
        const formGroup = service.createCrbComplaintStatusTypeFormGroup(sampleWithRequiredData);

        const crbComplaintStatusType = service.getCrbComplaintStatusType(formGroup) as any;

        expect(crbComplaintStatusType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbComplaintStatusType should not enable id FormControl', () => {
        const formGroup = service.createCrbComplaintStatusTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbComplaintStatusType should disable id FormControl', () => {
        const formGroup = service.createCrbComplaintStatusTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
