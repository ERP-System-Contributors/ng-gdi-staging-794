import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-brand-type.test-samples';

import { CardBrandTypeFormService } from './card-brand-type-form.service';

describe('CardBrandType Form Service', () => {
  let service: CardBrandTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardBrandTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCardBrandTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardBrandTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardBrandTypeCode: expect.any(Object),
            cardBrandType: expect.any(Object),
            cardBrandTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardBrandType should create a new form with FormGroup', () => {
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardBrandTypeCode: expect.any(Object),
            cardBrandType: expect.any(Object),
            cardBrandTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardBrandType', () => {
      it('should return NewCardBrandType for default CardBrandType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithNewData);

        const cardBrandType = service.getCardBrandType(formGroup) as any;

        expect(cardBrandType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardBrandType for empty CardBrandType initial value', () => {
        const formGroup = service.createCardBrandTypeFormGroup();

        const cardBrandType = service.getCardBrandType(formGroup) as any;

        expect(cardBrandType).toMatchObject({});
      });

      it('should return ICardBrandType', () => {
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithRequiredData);

        const cardBrandType = service.getCardBrandType(formGroup) as any;

        expect(cardBrandType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardBrandType should not enable id FormControl', () => {
        const formGroup = service.createCardBrandTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardBrandType should disable id FormControl', () => {
        const formGroup = service.createCardBrandTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
