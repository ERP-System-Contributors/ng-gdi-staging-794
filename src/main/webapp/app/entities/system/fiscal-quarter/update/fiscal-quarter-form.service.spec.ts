import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fiscal-quarter.test-samples';

import { FiscalQuarterFormService } from './fiscal-quarter-form.service';

describe('FiscalQuarter Form Service', () => {
  let service: FiscalQuarterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalQuarterFormService);
  });

  describe('Service methods', () => {
    describe('createFiscalQuarterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFiscalQuarterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quarterNumber: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            fiscalQuarterCode: expect.any(Object),
            fiscalYear: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
          })
        );
      });

      it('passing IFiscalQuarter should create a new form with FormGroup', () => {
        const formGroup = service.createFiscalQuarterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quarterNumber: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            fiscalQuarterCode: expect.any(Object),
            fiscalYear: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
          })
        );
      });
    });

    describe('getFiscalQuarter', () => {
      it('should return NewFiscalQuarter for default FiscalQuarter initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFiscalQuarterFormGroup(sampleWithNewData);

        const fiscalQuarter = service.getFiscalQuarter(formGroup) as any;

        expect(fiscalQuarter).toMatchObject(sampleWithNewData);
      });

      it('should return NewFiscalQuarter for empty FiscalQuarter initial value', () => {
        const formGroup = service.createFiscalQuarterFormGroup();

        const fiscalQuarter = service.getFiscalQuarter(formGroup) as any;

        expect(fiscalQuarter).toMatchObject({});
      });

      it('should return IFiscalQuarter', () => {
        const formGroup = service.createFiscalQuarterFormGroup(sampleWithRequiredData);

        const fiscalQuarter = service.getFiscalQuarter(formGroup) as any;

        expect(fiscalQuarter).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFiscalQuarter should not enable id FormControl', () => {
        const formGroup = service.createFiscalQuarterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFiscalQuarter should disable id FormControl', () => {
        const formGroup = service.createFiscalQuarterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
