import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../currency-authenticity-flag.test-samples';

import { CurrencyAuthenticityFlagFormService } from './currency-authenticity-flag-form.service';

describe('CurrencyAuthenticityFlag Form Service', () => {
  let service: CurrencyAuthenticityFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyAuthenticityFlagFormService);
  });

  describe('Service methods', () => {
    describe('createCurrencyAuthenticityFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyAuthenticityFlag: expect.any(Object),
            currencyAuthenticityType: expect.any(Object),
            currencyAuthenticityTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICurrencyAuthenticityFlag should create a new form with FormGroup', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyAuthenticityFlag: expect.any(Object),
            currencyAuthenticityType: expect.any(Object),
            currencyAuthenticityTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCurrencyAuthenticityFlag', () => {
      it('should return NewCurrencyAuthenticityFlag for default CurrencyAuthenticityFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithNewData);

        const currencyAuthenticityFlag = service.getCurrencyAuthenticityFlag(formGroup) as any;

        expect(currencyAuthenticityFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewCurrencyAuthenticityFlag for empty CurrencyAuthenticityFlag initial value', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup();

        const currencyAuthenticityFlag = service.getCurrencyAuthenticityFlag(formGroup) as any;

        expect(currencyAuthenticityFlag).toMatchObject({});
      });

      it('should return ICurrencyAuthenticityFlag', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithRequiredData);

        const currencyAuthenticityFlag = service.getCurrencyAuthenticityFlag(formGroup) as any;

        expect(currencyAuthenticityFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICurrencyAuthenticityFlag should not enable id FormControl', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCurrencyAuthenticityFlag should disable id FormControl', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
