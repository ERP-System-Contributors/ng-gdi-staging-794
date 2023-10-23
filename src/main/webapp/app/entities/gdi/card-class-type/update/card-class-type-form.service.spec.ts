import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-class-type.test-samples';

import { CardClassTypeFormService } from './card-class-type-form.service';

describe('CardClassType Form Service', () => {
  let service: CardClassTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardClassTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCardClassTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardClassTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardClassTypeCode: expect.any(Object),
            cardClassType: expect.any(Object),
            cardClassDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardClassType should create a new form with FormGroup', () => {
        const formGroup = service.createCardClassTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardClassTypeCode: expect.any(Object),
            cardClassType: expect.any(Object),
            cardClassDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardClassType', () => {
      it('should return NewCardClassType for default CardClassType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardClassTypeFormGroup(sampleWithNewData);

        const cardClassType = service.getCardClassType(formGroup) as any;

        expect(cardClassType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardClassType for empty CardClassType initial value', () => {
        const formGroup = service.createCardClassTypeFormGroup();

        const cardClassType = service.getCardClassType(formGroup) as any;

        expect(cardClassType).toMatchObject({});
      });

      it('should return ICardClassType', () => {
        const formGroup = service.createCardClassTypeFormGroup(sampleWithRequiredData);

        const cardClassType = service.getCardClassType(formGroup) as any;

        expect(cardClassType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardClassType should not enable id FormControl', () => {
        const formGroup = service.createCardClassTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardClassType should disable id FormControl', () => {
        const formGroup = service.createCardClassTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
