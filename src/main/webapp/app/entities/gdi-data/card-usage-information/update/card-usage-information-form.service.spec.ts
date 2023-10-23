import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-usage-information.test-samples';

import { CardUsageInformationFormService } from './card-usage-information-form.service';

describe('CardUsageInformation Form Service', () => {
  let service: CardUsageInformationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardUsageInformationFormService);
  });

  describe('Service methods', () => {
    describe('createCardUsageInformationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardUsageInformationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfLiveCards: expect.any(Object),
            totalActiveCards: expect.any(Object),
            totalNumberOfTransactionsDone: expect.any(Object),
            totalValueOfTransactionsDoneInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            cardType: expect.any(Object),
            cardBrand: expect.any(Object),
            cardCategoryType: expect.any(Object),
            transactionType: expect.any(Object),
            channelType: expect.any(Object),
            cardState: expect.any(Object),
          })
        );
      });

      it('passing ICardUsageInformation should create a new form with FormGroup', () => {
        const formGroup = service.createCardUsageInformationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfLiveCards: expect.any(Object),
            totalActiveCards: expect.any(Object),
            totalNumberOfTransactionsDone: expect.any(Object),
            totalValueOfTransactionsDoneInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            cardType: expect.any(Object),
            cardBrand: expect.any(Object),
            cardCategoryType: expect.any(Object),
            transactionType: expect.any(Object),
            channelType: expect.any(Object),
            cardState: expect.any(Object),
          })
        );
      });
    });

    describe('getCardUsageInformation', () => {
      it('should return NewCardUsageInformation for default CardUsageInformation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardUsageInformationFormGroup(sampleWithNewData);

        const cardUsageInformation = service.getCardUsageInformation(formGroup) as any;

        expect(cardUsageInformation).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardUsageInformation for empty CardUsageInformation initial value', () => {
        const formGroup = service.createCardUsageInformationFormGroup();

        const cardUsageInformation = service.getCardUsageInformation(formGroup) as any;

        expect(cardUsageInformation).toMatchObject({});
      });

      it('should return ICardUsageInformation', () => {
        const formGroup = service.createCardUsageInformationFormGroup(sampleWithRequiredData);

        const cardUsageInformation = service.getCardUsageInformation(formGroup) as any;

        expect(cardUsageInformation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardUsageInformation should not enable id FormControl', () => {
        const formGroup = service.createCardUsageInformationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardUsageInformation should disable id FormControl', () => {
        const formGroup = service.createCardUsageInformationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
