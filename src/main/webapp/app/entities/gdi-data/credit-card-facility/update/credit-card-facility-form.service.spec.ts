import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../credit-card-facility.test-samples';

import { CreditCardFacilityFormService } from './credit-card-facility-form.service';

describe('CreditCardFacility Form Service', () => {
  let service: CreditCardFacilityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardFacilityFormService);
  });

  describe('Service methods', () => {
    describe('createCreditCardFacilityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCreditCardFacilityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfActiveCreditCards: expect.any(Object),
            totalCreditCardLimitsInCCY: expect.any(Object),
            totalCreditCardLimitsInLCY: expect.any(Object),
            totalCreditCardAmountUtilisedInCCY: expect.any(Object),
            totalCreditCardAmountUtilisedInLcy: expect.any(Object),
            totalNPACreditCardAmountInFCY: expect.any(Object),
            totalNPACreditCardAmountInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            customerCategory: expect.any(Object),
            currencyCode: expect.any(Object),
          })
        );
      });

      it('passing ICreditCardFacility should create a new form with FormGroup', () => {
        const formGroup = service.createCreditCardFacilityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfActiveCreditCards: expect.any(Object),
            totalCreditCardLimitsInCCY: expect.any(Object),
            totalCreditCardLimitsInLCY: expect.any(Object),
            totalCreditCardAmountUtilisedInCCY: expect.any(Object),
            totalCreditCardAmountUtilisedInLcy: expect.any(Object),
            totalNPACreditCardAmountInFCY: expect.any(Object),
            totalNPACreditCardAmountInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            customerCategory: expect.any(Object),
            currencyCode: expect.any(Object),
          })
        );
      });
    });

    describe('getCreditCardFacility', () => {
      it('should return NewCreditCardFacility for default CreditCardFacility initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCreditCardFacilityFormGroup(sampleWithNewData);

        const creditCardFacility = service.getCreditCardFacility(formGroup) as any;

        expect(creditCardFacility).toMatchObject(sampleWithNewData);
      });

      it('should return NewCreditCardFacility for empty CreditCardFacility initial value', () => {
        const formGroup = service.createCreditCardFacilityFormGroup();

        const creditCardFacility = service.getCreditCardFacility(formGroup) as any;

        expect(creditCardFacility).toMatchObject({});
      });

      it('should return ICreditCardFacility', () => {
        const formGroup = service.createCreditCardFacilityFormGroup(sampleWithRequiredData);

        const creditCardFacility = service.getCreditCardFacility(formGroup) as any;

        expect(creditCardFacility).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICreditCardFacility should not enable id FormControl', () => {
        const formGroup = service.createCreditCardFacilityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCreditCardFacility should disable id FormControl', () => {
        const formGroup = service.createCreditCardFacilityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
