import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-fraud-information.test-samples';

import { CardFraudInformationFormService } from './card-fraud-information-form.service';

describe('CardFraudInformation Form Service', () => {
  let service: CardFraudInformationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFraudInformationFormService);
  });

  describe('Service methods', () => {
    describe('createCardFraudInformationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardFraudInformationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfFraudIncidents: expect.any(Object),
            valueOfFraudIncedentsInLCY: expect.any(Object),
          })
        );
      });

      it('passing ICardFraudInformation should create a new form with FormGroup', () => {
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfFraudIncidents: expect.any(Object),
            valueOfFraudIncedentsInLCY: expect.any(Object),
          })
        );
      });
    });

    describe('getCardFraudInformation', () => {
      it('should return NewCardFraudInformation for default CardFraudInformation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithNewData);

        const cardFraudInformation = service.getCardFraudInformation(formGroup) as any;

        expect(cardFraudInformation).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardFraudInformation for empty CardFraudInformation initial value', () => {
        const formGroup = service.createCardFraudInformationFormGroup();

        const cardFraudInformation = service.getCardFraudInformation(formGroup) as any;

        expect(cardFraudInformation).toMatchObject({});
      });

      it('should return ICardFraudInformation', () => {
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithRequiredData);

        const cardFraudInformation = service.getCardFraudInformation(formGroup) as any;

        expect(cardFraudInformation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardFraudInformation should not enable id FormControl', () => {
        const formGroup = service.createCardFraudInformationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardFraudInformation should disable id FormControl', () => {
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
