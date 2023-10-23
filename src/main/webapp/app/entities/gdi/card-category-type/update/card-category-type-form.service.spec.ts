import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-category-type.test-samples';

import { CardCategoryTypeFormService } from './card-category-type-form.service';

describe('CardCategoryType Form Service', () => {
  let service: CardCategoryTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCategoryTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCardCategoryTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardCategoryTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardCategoryFlag: expect.any(Object),
            cardCategoryDescription: expect.any(Object),
            cardCategoryDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardCategoryType should create a new form with FormGroup', () => {
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardCategoryFlag: expect.any(Object),
            cardCategoryDescription: expect.any(Object),
            cardCategoryDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardCategoryType', () => {
      it('should return NewCardCategoryType for default CardCategoryType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithNewData);

        const cardCategoryType = service.getCardCategoryType(formGroup) as any;

        expect(cardCategoryType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardCategoryType for empty CardCategoryType initial value', () => {
        const formGroup = service.createCardCategoryTypeFormGroup();

        const cardCategoryType = service.getCardCategoryType(formGroup) as any;

        expect(cardCategoryType).toMatchObject({});
      });

      it('should return ICardCategoryType', () => {
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithRequiredData);

        const cardCategoryType = service.getCardCategoryType(formGroup) as any;

        expect(cardCategoryType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardCategoryType should not enable id FormControl', () => {
        const formGroup = service.createCardCategoryTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardCategoryType should disable id FormControl', () => {
        const formGroup = service.createCardCategoryTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
