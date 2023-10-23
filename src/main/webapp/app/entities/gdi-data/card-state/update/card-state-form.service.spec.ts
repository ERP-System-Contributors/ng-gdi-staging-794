import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-state.test-samples';

import { CardStateFormService } from './card-state-form.service';

describe('CardState Form Service', () => {
  let service: CardStateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStateFormService);
  });

  describe('Service methods', () => {
    describe('createCardStateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardStateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStateFlag: expect.any(Object),
            cardStateFlagDetails: expect.any(Object),
            cardStateFlagDescription: expect.any(Object),
          })
        );
      });

      it('passing ICardState should create a new form with FormGroup', () => {
        const formGroup = service.createCardStateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStateFlag: expect.any(Object),
            cardStateFlagDetails: expect.any(Object),
            cardStateFlagDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCardState', () => {
      it('should return NewCardState for default CardState initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardStateFormGroup(sampleWithNewData);

        const cardState = service.getCardState(formGroup) as any;

        expect(cardState).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardState for empty CardState initial value', () => {
        const formGroup = service.createCardStateFormGroup();

        const cardState = service.getCardState(formGroup) as any;

        expect(cardState).toMatchObject({});
      });

      it('should return ICardState', () => {
        const formGroup = service.createCardStateFormGroup(sampleWithRequiredData);

        const cardState = service.getCardState(formGroup) as any;

        expect(cardState).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardState should not enable id FormControl', () => {
        const formGroup = service.createCardStateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardState should disable id FormControl', () => {
        const formGroup = service.createCardStateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
