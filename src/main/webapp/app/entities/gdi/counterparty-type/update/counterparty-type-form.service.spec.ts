import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../counterparty-type.test-samples';

import { CounterpartyTypeFormService } from './counterparty-type-form.service';

describe('CounterpartyType Form Service', () => {
  let service: CounterpartyTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterpartyTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCounterpartyTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCounterpartyTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyTypeCode: expect.any(Object),
            counterPartyType: expect.any(Object),
            counterpartyTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICounterpartyType should create a new form with FormGroup', () => {
        const formGroup = service.createCounterpartyTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyTypeCode: expect.any(Object),
            counterPartyType: expect.any(Object),
            counterpartyTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCounterpartyType', () => {
      it('should return NewCounterpartyType for default CounterpartyType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCounterpartyTypeFormGroup(sampleWithNewData);

        const counterpartyType = service.getCounterpartyType(formGroup) as any;

        expect(counterpartyType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCounterpartyType for empty CounterpartyType initial value', () => {
        const formGroup = service.createCounterpartyTypeFormGroup();

        const counterpartyType = service.getCounterpartyType(formGroup) as any;

        expect(counterpartyType).toMatchObject({});
      });

      it('should return ICounterpartyType', () => {
        const formGroup = service.createCounterpartyTypeFormGroup(sampleWithRequiredData);

        const counterpartyType = service.getCounterpartyType(formGroup) as any;

        expect(counterpartyType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICounterpartyType should not enable id FormControl', () => {
        const formGroup = service.createCounterpartyTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCounterpartyType should disable id FormControl', () => {
        const formGroup = service.createCounterpartyTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
