import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chart-of-accounts-code.test-samples';

import { ChartOfAccountsCodeFormService } from './chart-of-accounts-code-form.service';

describe('ChartOfAccountsCode Form Service', () => {
  let service: ChartOfAccountsCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartOfAccountsCodeFormService);
  });

  describe('Service methods', () => {
    describe('createChartOfAccountsCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chartOfAccountsCode: expect.any(Object),
            chartOfAccountsClass: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing IChartOfAccountsCode should create a new form with FormGroup', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chartOfAccountsCode: expect.any(Object),
            chartOfAccountsClass: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getChartOfAccountsCode', () => {
      it('should return NewChartOfAccountsCode for default ChartOfAccountsCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithNewData);

        const chartOfAccountsCode = service.getChartOfAccountsCode(formGroup) as any;

        expect(chartOfAccountsCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewChartOfAccountsCode for empty ChartOfAccountsCode initial value', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup();

        const chartOfAccountsCode = service.getChartOfAccountsCode(formGroup) as any;

        expect(chartOfAccountsCode).toMatchObject({});
      });

      it('should return IChartOfAccountsCode', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithRequiredData);

        const chartOfAccountsCode = service.getChartOfAccountsCode(formGroup) as any;

        expect(chartOfAccountsCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChartOfAccountsCode should not enable id FormControl', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChartOfAccountsCode should disable id FormControl', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
