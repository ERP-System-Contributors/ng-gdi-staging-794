import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-record-file-type.test-samples';

import { CrbRecordFileTypeFormService } from './crb-record-file-type-form.service';

describe('CrbRecordFileType Form Service', () => {
  let service: CrbRecordFileTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbRecordFileTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbRecordFileTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbRecordFileTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            recordFileTypeCode: expect.any(Object),
            recordFileType: expect.any(Object),
            recordFileTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICrbRecordFileType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbRecordFileTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            recordFileTypeCode: expect.any(Object),
            recordFileType: expect.any(Object),
            recordFileTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbRecordFileType', () => {
      it('should return NewCrbRecordFileType for default CrbRecordFileType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbRecordFileTypeFormGroup(sampleWithNewData);

        const crbRecordFileType = service.getCrbRecordFileType(formGroup) as any;

        expect(crbRecordFileType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbRecordFileType for empty CrbRecordFileType initial value', () => {
        const formGroup = service.createCrbRecordFileTypeFormGroup();

        const crbRecordFileType = service.getCrbRecordFileType(formGroup) as any;

        expect(crbRecordFileType).toMatchObject({});
      });

      it('should return ICrbRecordFileType', () => {
        const formGroup = service.createCrbRecordFileTypeFormGroup(sampleWithRequiredData);

        const crbRecordFileType = service.getCrbRecordFileType(formGroup) as any;

        expect(crbRecordFileType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbRecordFileType should not enable id FormControl', () => {
        const formGroup = service.createCrbRecordFileTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbRecordFileType should disable id FormControl', () => {
        const formGroup = service.createCrbRecordFileTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
