import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-report-view-band.test-samples';

import { CrbReportViewBandFormService } from './crb-report-view-band-form.service';

describe('CrbReportViewBand Form Service', () => {
  let service: CrbReportViewBandFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbReportViewBandFormService);
  });

  describe('Service methods', () => {
    describe('createCrbReportViewBandFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbReportViewBandFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportViewCode: expect.any(Object),
            reportViewCategory: expect.any(Object),
            reportViewCategoryDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbReportViewBand should create a new form with FormGroup', () => {
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportViewCode: expect.any(Object),
            reportViewCategory: expect.any(Object),
            reportViewCategoryDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbReportViewBand', () => {
      it('should return NewCrbReportViewBand for default CrbReportViewBand initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithNewData);

        const crbReportViewBand = service.getCrbReportViewBand(formGroup) as any;

        expect(crbReportViewBand).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbReportViewBand for empty CrbReportViewBand initial value', () => {
        const formGroup = service.createCrbReportViewBandFormGroup();

        const crbReportViewBand = service.getCrbReportViewBand(formGroup) as any;

        expect(crbReportViewBand).toMatchObject({});
      });

      it('should return ICrbReportViewBand', () => {
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithRequiredData);

        const crbReportViewBand = service.getCrbReportViewBand(formGroup) as any;

        expect(crbReportViewBand).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbReportViewBand should not enable id FormControl', () => {
        const formGroup = service.createCrbReportViewBandFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbReportViewBand should disable id FormControl', () => {
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
