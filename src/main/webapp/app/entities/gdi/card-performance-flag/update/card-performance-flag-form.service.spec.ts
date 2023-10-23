import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card-performance-flag.test-samples';

import { CardPerformanceFlagFormService } from './card-performance-flag-form.service';

describe('CardPerformanceFlag Form Service', () => {
  let service: CardPerformanceFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardPerformanceFlagFormService);
  });

  describe('Service methods', () => {
    describe('createCardPerformanceFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardPerformanceFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardPerformanceFlag: expect.any(Object),
            cardPerformanceFlagDescription: expect.any(Object),
            cardPerformanceFlagDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardPerformanceFlag should create a new form with FormGroup', () => {
        const formGroup = service.createCardPerformanceFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardPerformanceFlag: expect.any(Object),
            cardPerformanceFlagDescription: expect.any(Object),
            cardPerformanceFlagDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardPerformanceFlag', () => {
      it('should return NewCardPerformanceFlag for default CardPerformanceFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardPerformanceFlagFormGroup(sampleWithNewData);

        const cardPerformanceFlag = service.getCardPerformanceFlag(formGroup) as any;

        expect(cardPerformanceFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardPerformanceFlag for empty CardPerformanceFlag initial value', () => {
        const formGroup = service.createCardPerformanceFlagFormGroup();

        const cardPerformanceFlag = service.getCardPerformanceFlag(formGroup) as any;

        expect(cardPerformanceFlag).toMatchObject({});
      });

      it('should return ICardPerformanceFlag', () => {
        const formGroup = service.createCardPerformanceFlagFormGroup(sampleWithRequiredData);

        const cardPerformanceFlag = service.getCardPerformanceFlag(formGroup) as any;

        expect(cardPerformanceFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardPerformanceFlag should not enable id FormControl', () => {
        const formGroup = service.createCardPerformanceFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardPerformanceFlag should disable id FormControl', () => {
        const formGroup = service.createCardPerformanceFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
