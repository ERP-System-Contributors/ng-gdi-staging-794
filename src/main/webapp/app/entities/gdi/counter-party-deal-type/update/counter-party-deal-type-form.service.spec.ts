import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../counter-party-deal-type.test-samples';

import { CounterPartyDealTypeFormService } from './counter-party-deal-type-form.service';

describe('CounterPartyDealType Form Service', () => {
  let service: CounterPartyDealTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterPartyDealTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCounterPartyDealTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCounterPartyDealTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyDealCode: expect.any(Object),
            counterpartyDealTypeDetails: expect.any(Object),
            counterpartyDealTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICounterPartyDealType should create a new form with FormGroup', () => {
        const formGroup = service.createCounterPartyDealTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyDealCode: expect.any(Object),
            counterpartyDealTypeDetails: expect.any(Object),
            counterpartyDealTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCounterPartyDealType', () => {
      it('should return NewCounterPartyDealType for default CounterPartyDealType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCounterPartyDealTypeFormGroup(sampleWithNewData);

        const counterPartyDealType = service.getCounterPartyDealType(formGroup) as any;

        expect(counterPartyDealType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCounterPartyDealType for empty CounterPartyDealType initial value', () => {
        const formGroup = service.createCounterPartyDealTypeFormGroup();

        const counterPartyDealType = service.getCounterPartyDealType(formGroup) as any;

        expect(counterPartyDealType).toMatchObject({});
      });

      it('should return ICounterPartyDealType', () => {
        const formGroup = service.createCounterPartyDealTypeFormGroup(sampleWithRequiredData);

        const counterPartyDealType = service.getCounterPartyDealType(formGroup) as any;

        expect(counterPartyDealType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICounterPartyDealType should not enable id FormControl', () => {
        const formGroup = service.createCounterPartyDealTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCounterPartyDealType should disable id FormControl', () => {
        const formGroup = service.createCounterPartyDealTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
