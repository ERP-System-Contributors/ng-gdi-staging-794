import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../kenyan-currency-denomination.test-samples';

import { KenyanCurrencyDenominationFormService } from './kenyan-currency-denomination-form.service';

describe('KenyanCurrencyDenomination Form Service', () => {
  let service: KenyanCurrencyDenominationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KenyanCurrencyDenominationFormService);
  });

  describe('Service methods', () => {
    describe('createKenyanCurrencyDenominationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKenyanCurrencyDenominationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyDenominationCode: expect.any(Object),
            currencyDenominationType: expect.any(Object),
            currencyDenominationTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IKenyanCurrencyDenomination should create a new form with FormGroup', () => {
        const formGroup = service.createKenyanCurrencyDenominationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyDenominationCode: expect.any(Object),
            currencyDenominationType: expect.any(Object),
            currencyDenominationTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getKenyanCurrencyDenomination', () => {
      it('should return NewKenyanCurrencyDenomination for default KenyanCurrencyDenomination initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createKenyanCurrencyDenominationFormGroup(sampleWithNewData);

        const kenyanCurrencyDenomination = service.getKenyanCurrencyDenomination(formGroup) as any;

        expect(kenyanCurrencyDenomination).toMatchObject(sampleWithNewData);
      });

      it('should return NewKenyanCurrencyDenomination for empty KenyanCurrencyDenomination initial value', () => {
        const formGroup = service.createKenyanCurrencyDenominationFormGroup();

        const kenyanCurrencyDenomination = service.getKenyanCurrencyDenomination(formGroup) as any;

        expect(kenyanCurrencyDenomination).toMatchObject({});
      });

      it('should return IKenyanCurrencyDenomination', () => {
        const formGroup = service.createKenyanCurrencyDenominationFormGroup(sampleWithRequiredData);

        const kenyanCurrencyDenomination = service.getKenyanCurrencyDenomination(formGroup) as any;

        expect(kenyanCurrencyDenomination).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKenyanCurrencyDenomination should not enable id FormControl', () => {
        const formGroup = service.createKenyanCurrencyDenominationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKenyanCurrencyDenomination should disable id FormControl', () => {
        const formGroup = service.createKenyanCurrencyDenominationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
