import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-issuer-charges.test-samples';

import { CardIssuerChargesFormService } from './card-issuer-charges-form.service';

describe('CardIssuerCharges Form Service', () => {
  let service: CardIssuerChargesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardIssuerChargesFormService);
  });

  describe('Service methods', () => {
    describe('createCardIssuerChargesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardIssuerChargesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            cardFeeChargeInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            cardCategory: expect.any(Object),
            cardType: expect.any(Object),
            cardBrand: expect.any(Object),
            cardClass: expect.any(Object),
            cardChargeType: expect.any(Object),
          })
        );
      });

      it('passing ICardIssuerCharges should create a new form with FormGroup', () => {
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            cardFeeChargeInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            cardCategory: expect.any(Object),
            cardType: expect.any(Object),
            cardBrand: expect.any(Object),
            cardClass: expect.any(Object),
            cardChargeType: expect.any(Object),
          })
        );
      });
    });

    describe('getCardIssuerCharges', () => {
      it('should return NewCardIssuerCharges for default CardIssuerCharges initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithNewData);

        const cardIssuerCharges = service.getCardIssuerCharges(formGroup) as any;

        expect(cardIssuerCharges).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardIssuerCharges for empty CardIssuerCharges initial value', () => {
        const formGroup = service.createCardIssuerChargesFormGroup();

        const cardIssuerCharges = service.getCardIssuerCharges(formGroup) as any;

        expect(cardIssuerCharges).toMatchObject({});
      });

      it('should return ICardIssuerCharges', () => {
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithRequiredData);

        const cardIssuerCharges = service.getCardIssuerCharges(formGroup) as any;

        expect(cardIssuerCharges).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardIssuerCharges should not enable id FormControl', () => {
        const formGroup = service.createCardIssuerChargesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardIssuerCharges should disable id FormControl', () => {
        const formGroup = service.createCardIssuerChargesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
