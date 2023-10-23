import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fiscal-year.test-samples';

import { FiscalYearFormService } from './fiscal-year-form.service';

describe('FiscalYear Form Service', () => {
  let service: FiscalYearFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalYearFormService);
  });

  describe('Service methods', () => {
    describe('createFiscalYearFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFiscalYearFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fiscalYearCode: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            fiscalYearStatus: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            createdBy: expect.any(Object),
            lastUpdatedBy: expect.any(Object),
          })
        );
      });

      it('passing IFiscalYear should create a new form with FormGroup', () => {
        const formGroup = service.createFiscalYearFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fiscalYearCode: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            fiscalYearStatus: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            createdBy: expect.any(Object),
            lastUpdatedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getFiscalYear', () => {
      it('should return NewFiscalYear for default FiscalYear initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFiscalYearFormGroup(sampleWithNewData);

        const fiscalYear = service.getFiscalYear(formGroup) as any;

        expect(fiscalYear).toMatchObject(sampleWithNewData);
      });

      it('should return NewFiscalYear for empty FiscalYear initial value', () => {
        const formGroup = service.createFiscalYearFormGroup();

        const fiscalYear = service.getFiscalYear(formGroup) as any;

        expect(fiscalYear).toMatchObject({});
      });

      it('should return IFiscalYear', () => {
        const formGroup = service.createFiscalYearFormGroup(sampleWithRequiredData);

        const fiscalYear = service.getFiscalYear(formGroup) as any;

        expect(fiscalYear).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFiscalYear should not enable id FormControl', () => {
        const formGroup = service.createFiscalYearFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFiscalYear should disable id FormControl', () => {
        const formGroup = service.createFiscalYearFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
