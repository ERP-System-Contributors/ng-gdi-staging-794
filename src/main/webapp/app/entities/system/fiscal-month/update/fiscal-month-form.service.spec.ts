import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fiscal-month.test-samples';

import { FiscalMonthFormService } from './fiscal-month-form.service';

describe('FiscalMonth Form Service', () => {
  let service: FiscalMonthFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalMonthFormService);
  });

  describe('Service methods', () => {
    describe('createFiscalMonthFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFiscalMonthFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            monthNumber: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            fiscalMonthCode: expect.any(Object),
            fiscalYear: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            fiscalQuarter: expect.any(Object),
          })
        );
      });

      it('passing IFiscalMonth should create a new form with FormGroup', () => {
        const formGroup = service.createFiscalMonthFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            monthNumber: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            fiscalMonthCode: expect.any(Object),
            fiscalYear: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            fiscalQuarter: expect.any(Object),
          })
        );
      });
    });

    describe('getFiscalMonth', () => {
      it('should return NewFiscalMonth for default FiscalMonth initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFiscalMonthFormGroup(sampleWithNewData);

        const fiscalMonth = service.getFiscalMonth(formGroup) as any;

        expect(fiscalMonth).toMatchObject(sampleWithNewData);
      });

      it('should return NewFiscalMonth for empty FiscalMonth initial value', () => {
        const formGroup = service.createFiscalMonthFormGroup();

        const fiscalMonth = service.getFiscalMonth(formGroup) as any;

        expect(fiscalMonth).toMatchObject({});
      });

      it('should return IFiscalMonth', () => {
        const formGroup = service.createFiscalMonthFormGroup(sampleWithRequiredData);

        const fiscalMonth = service.getFiscalMonth(formGroup) as any;

        expect(fiscalMonth).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFiscalMonth should not enable id FormControl', () => {
        const formGroup = service.createFiscalMonthFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFiscalMonth should disable id FormControl', () => {
        const formGroup = service.createFiscalMonthFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
