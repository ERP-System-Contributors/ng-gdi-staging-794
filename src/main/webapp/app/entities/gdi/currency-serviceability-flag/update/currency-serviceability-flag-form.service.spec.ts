import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../currency-serviceability-flag.test-samples';

import { CurrencyServiceabilityFlagFormService } from './currency-serviceability-flag-form.service';

describe('CurrencyServiceabilityFlag Form Service', () => {
  let service: CurrencyServiceabilityFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyServiceabilityFlagFormService);
  });

  describe('Service methods', () => {
    describe('createCurrencyServiceabilityFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCurrencyServiceabilityFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyServiceabilityFlag: expect.any(Object),
            currencyServiceability: expect.any(Object),
            currencyServiceabilityFlagDetails: expect.any(Object),
          })
        );
      });

      it('passing ICurrencyServiceabilityFlag should create a new form with FormGroup', () => {
        const formGroup = service.createCurrencyServiceabilityFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyServiceabilityFlag: expect.any(Object),
            currencyServiceability: expect.any(Object),
            currencyServiceabilityFlagDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCurrencyServiceabilityFlag', () => {
      it('should return NewCurrencyServiceabilityFlag for default CurrencyServiceabilityFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCurrencyServiceabilityFlagFormGroup(sampleWithNewData);

        const currencyServiceabilityFlag = service.getCurrencyServiceabilityFlag(formGroup) as any;

        expect(currencyServiceabilityFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewCurrencyServiceabilityFlag for empty CurrencyServiceabilityFlag initial value', () => {
        const formGroup = service.createCurrencyServiceabilityFlagFormGroup();

        const currencyServiceabilityFlag = service.getCurrencyServiceabilityFlag(formGroup) as any;

        expect(currencyServiceabilityFlag).toMatchObject({});
      });

      it('should return ICurrencyServiceabilityFlag', () => {
        const formGroup = service.createCurrencyServiceabilityFlagFormGroup(sampleWithRequiredData);

        const currencyServiceabilityFlag = service.getCurrencyServiceabilityFlag(formGroup) as any;

        expect(currencyServiceabilityFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICurrencyServiceabilityFlag should not enable id FormControl', () => {
        const formGroup = service.createCurrencyServiceabilityFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCurrencyServiceabilityFlag should disable id FormControl', () => {
        const formGroup = service.createCurrencyServiceabilityFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
