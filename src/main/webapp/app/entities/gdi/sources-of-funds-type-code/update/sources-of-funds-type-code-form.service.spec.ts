import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sources-of-funds-type-code.test-samples';

import { SourcesOfFundsTypeCodeFormService } from './sources-of-funds-type-code-form.service';

describe('SourcesOfFundsTypeCode Form Service', () => {
  let service: SourcesOfFundsTypeCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourcesOfFundsTypeCodeFormService);
  });

  describe('Service methods', () => {
    describe('createSourcesOfFundsTypeCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSourcesOfFundsTypeCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOfFundsTypeCode: expect.any(Object),
            sourceOfFundsType: expect.any(Object),
            sourceOfFundsTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ISourcesOfFundsTypeCode should create a new form with FormGroup', () => {
        const formGroup = service.createSourcesOfFundsTypeCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOfFundsTypeCode: expect.any(Object),
            sourceOfFundsType: expect.any(Object),
            sourceOfFundsTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getSourcesOfFundsTypeCode', () => {
      it('should return NewSourcesOfFundsTypeCode for default SourcesOfFundsTypeCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSourcesOfFundsTypeCodeFormGroup(sampleWithNewData);

        const sourcesOfFundsTypeCode = service.getSourcesOfFundsTypeCode(formGroup) as any;

        expect(sourcesOfFundsTypeCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewSourcesOfFundsTypeCode for empty SourcesOfFundsTypeCode initial value', () => {
        const formGroup = service.createSourcesOfFundsTypeCodeFormGroup();

        const sourcesOfFundsTypeCode = service.getSourcesOfFundsTypeCode(formGroup) as any;

        expect(sourcesOfFundsTypeCode).toMatchObject({});
      });

      it('should return ISourcesOfFundsTypeCode', () => {
        const formGroup = service.createSourcesOfFundsTypeCodeFormGroup(sampleWithRequiredData);

        const sourcesOfFundsTypeCode = service.getSourcesOfFundsTypeCode(formGroup) as any;

        expect(sourcesOfFundsTypeCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISourcesOfFundsTypeCode should not enable id FormControl', () => {
        const formGroup = service.createSourcesOfFundsTypeCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSourcesOfFundsTypeCode should disable id FormControl', () => {
        const formGroup = service.createSourcesOfFundsTypeCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
