import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-file-transmission-status.test-samples';

import { CrbFileTransmissionStatusFormService } from './crb-file-transmission-status-form.service';

describe('CrbFileTransmissionStatus Form Service', () => {
  let service: CrbFileTransmissionStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbFileTransmissionStatusFormService);
  });

  describe('Service methods', () => {
    describe('createCrbFileTransmissionStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbFileTransmissionStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submittedFileStatusTypeCode: expect.any(Object),
            submittedFileStatusType: expect.any(Object),
            submittedFileStatusTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbFileTransmissionStatus should create a new form with FormGroup', () => {
        const formGroup = service.createCrbFileTransmissionStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submittedFileStatusTypeCode: expect.any(Object),
            submittedFileStatusType: expect.any(Object),
            submittedFileStatusTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbFileTransmissionStatus', () => {
      it('should return NewCrbFileTransmissionStatus for default CrbFileTransmissionStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbFileTransmissionStatusFormGroup(sampleWithNewData);

        const crbFileTransmissionStatus = service.getCrbFileTransmissionStatus(formGroup) as any;

        expect(crbFileTransmissionStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbFileTransmissionStatus for empty CrbFileTransmissionStatus initial value', () => {
        const formGroup = service.createCrbFileTransmissionStatusFormGroup();

        const crbFileTransmissionStatus = service.getCrbFileTransmissionStatus(formGroup) as any;

        expect(crbFileTransmissionStatus).toMatchObject({});
      });

      it('should return ICrbFileTransmissionStatus', () => {
        const formGroup = service.createCrbFileTransmissionStatusFormGroup(sampleWithRequiredData);

        const crbFileTransmissionStatus = service.getCrbFileTransmissionStatus(formGroup) as any;

        expect(crbFileTransmissionStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbFileTransmissionStatus should not enable id FormControl', () => {
        const formGroup = service.createCrbFileTransmissionStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbFileTransmissionStatus should disable id FormControl', () => {
        const formGroup = service.createCrbFileTransmissionStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
