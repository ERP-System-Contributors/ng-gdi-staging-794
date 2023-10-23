import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-types.test-samples';

import { CardTypesFormService } from './card-types-form.service';

describe('CardTypes Form Service', () => {
  let service: CardTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardTypesFormService);
  });

  describe('Service methods', () => {
    describe('createCardTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardTypeCode: expect.any(Object),
            cardType: expect.any(Object),
            cardTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardTypes should create a new form with FormGroup', () => {
        const formGroup = service.createCardTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardTypeCode: expect.any(Object),
            cardType: expect.any(Object),
            cardTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardTypes', () => {
      it('should return NewCardTypes for default CardTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardTypesFormGroup(sampleWithNewData);

        const cardTypes = service.getCardTypes(formGroup) as any;

        expect(cardTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardTypes for empty CardTypes initial value', () => {
        const formGroup = service.createCardTypesFormGroup();

        const cardTypes = service.getCardTypes(formGroup) as any;

        expect(cardTypes).toMatchObject({});
      });

      it('should return ICardTypes', () => {
        const formGroup = service.createCardTypesFormGroup(sampleWithRequiredData);

        const cardTypes = service.getCardTypes(formGroup) as any;

        expect(cardTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardTypes should not enable id FormControl', () => {
        const formGroup = service.createCardTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardTypes should disable id FormControl', () => {
        const formGroup = service.createCardTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
