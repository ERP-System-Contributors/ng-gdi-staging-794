import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../counter-party-category.test-samples';

import { CounterPartyCategoryFormService } from './counter-party-category-form.service';

describe('CounterPartyCategory Form Service', () => {
  let service: CounterPartyCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterPartyCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCounterPartyCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyCategoryCode: expect.any(Object),
            counterpartyCategoryCodeDetails: expect.any(Object),
            counterpartyCategoryDescription: expect.any(Object),
          })
        );
      });

      it('passing ICounterPartyCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyCategoryCode: expect.any(Object),
            counterpartyCategoryCodeDetails: expect.any(Object),
            counterpartyCategoryDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCounterPartyCategory', () => {
      it('should return NewCounterPartyCategory for default CounterPartyCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithNewData);

        const counterPartyCategory = service.getCounterPartyCategory(formGroup) as any;

        expect(counterPartyCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCounterPartyCategory for empty CounterPartyCategory initial value', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup();

        const counterPartyCategory = service.getCounterPartyCategory(formGroup) as any;

        expect(counterPartyCategory).toMatchObject({});
      });

      it('should return ICounterPartyCategory', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithRequiredData);

        const counterPartyCategory = service.getCounterPartyCategory(formGroup) as any;

        expect(counterPartyCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICounterPartyCategory should not enable id FormControl', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCounterPartyCategory should disable id FormControl', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
