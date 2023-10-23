import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-status-flag.test-samples';

import { CardStatusFlagFormService } from './card-status-flag-form.service';

describe('CardStatusFlag Form Service', () => {
  let service: CardStatusFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStatusFlagFormService);
  });

  describe('Service methods', () => {
    describe('createCardStatusFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardStatusFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStatusFlag: expect.any(Object),
            cardStatusFlagDescription: expect.any(Object),
            cardStatusFlagDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardStatusFlag should create a new form with FormGroup', () => {
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStatusFlag: expect.any(Object),
            cardStatusFlagDescription: expect.any(Object),
            cardStatusFlagDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardStatusFlag', () => {
      it('should return NewCardStatusFlag for default CardStatusFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithNewData);

        const cardStatusFlag = service.getCardStatusFlag(formGroup) as any;

        expect(cardStatusFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardStatusFlag for empty CardStatusFlag initial value', () => {
        const formGroup = service.createCardStatusFlagFormGroup();

        const cardStatusFlag = service.getCardStatusFlag(formGroup) as any;

        expect(cardStatusFlag).toMatchObject({});
      });

      it('should return ICardStatusFlag', () => {
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithRequiredData);

        const cardStatusFlag = service.getCardStatusFlag(formGroup) as any;

        expect(cardStatusFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardStatusFlag should not enable id FormControl', () => {
        const formGroup = service.createCardStatusFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardStatusFlag should disable id FormControl', () => {
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
