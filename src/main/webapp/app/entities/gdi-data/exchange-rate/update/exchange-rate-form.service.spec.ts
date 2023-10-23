import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../exchange-rate.test-samples';

import { ExchangeRateFormService } from './exchange-rate-form.service';

describe('ExchangeRate Form Service', () => {
  let service: ExchangeRateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRateFormService);
  });

  describe('Service methods', () => {
    describe('createExchangeRateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createExchangeRateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessReportingDay: expect.any(Object),
            buyingRate: expect.any(Object),
            sellingRate: expect.any(Object),
            meanRate: expect.any(Object),
            closingBidRate: expect.any(Object),
            closingOfferRate: expect.any(Object),
            usdCrossRate: expect.any(Object),
            institutionCode: expect.any(Object),
            currencyCode: expect.any(Object),
          })
        );
      });

      it('passing IExchangeRate should create a new form with FormGroup', () => {
        const formGroup = service.createExchangeRateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessReportingDay: expect.any(Object),
            buyingRate: expect.any(Object),
            sellingRate: expect.any(Object),
            meanRate: expect.any(Object),
            closingBidRate: expect.any(Object),
            closingOfferRate: expect.any(Object),
            usdCrossRate: expect.any(Object),
            institutionCode: expect.any(Object),
            currencyCode: expect.any(Object),
          })
        );
      });
    });

    describe('getExchangeRate', () => {
      it('should return NewExchangeRate for default ExchangeRate initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createExchangeRateFormGroup(sampleWithNewData);

        const exchangeRate = service.getExchangeRate(formGroup) as any;

        expect(exchangeRate).toMatchObject(sampleWithNewData);
      });

      it('should return NewExchangeRate for empty ExchangeRate initial value', () => {
        const formGroup = service.createExchangeRateFormGroup();

        const exchangeRate = service.getExchangeRate(formGroup) as any;

        expect(exchangeRate).toMatchObject({});
      });

      it('should return IExchangeRate', () => {
        const formGroup = service.createExchangeRateFormGroup(sampleWithRequiredData);

        const exchangeRate = service.getExchangeRate(formGroup) as any;

        expect(exchangeRate).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IExchangeRate should not enable id FormControl', () => {
        const formGroup = service.createExchangeRateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewExchangeRate should disable id FormControl', () => {
        const formGroup = service.createExchangeRateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
