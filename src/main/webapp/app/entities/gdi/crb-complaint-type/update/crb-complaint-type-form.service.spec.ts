import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-complaint-type.test-samples';

import { CrbComplaintTypeFormService } from './crb-complaint-type-form.service';

describe('CrbComplaintType Form Service', () => {
  let service: CrbComplaintTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbComplaintTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbComplaintTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            complaintTypeCode: expect.any(Object),
            complaintType: expect.any(Object),
            complaintTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbComplaintType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            complaintTypeCode: expect.any(Object),
            complaintType: expect.any(Object),
            complaintTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbComplaintType', () => {
      it('should return NewCrbComplaintType for default CrbComplaintType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithNewData);

        const crbComplaintType = service.getCrbComplaintType(formGroup) as any;

        expect(crbComplaintType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbComplaintType for empty CrbComplaintType initial value', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup();

        const crbComplaintType = service.getCrbComplaintType(formGroup) as any;

        expect(crbComplaintType).toMatchObject({});
      });

      it('should return ICrbComplaintType', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithRequiredData);

        const crbComplaintType = service.getCrbComplaintType(formGroup) as any;

        expect(crbComplaintType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbComplaintType should not enable id FormControl', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbComplaintType should disable id FormControl', () => {
        const formGroup = service.createCrbComplaintTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
