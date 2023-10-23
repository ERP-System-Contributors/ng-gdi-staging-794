import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../weekly-cash-holding.test-samples';

import { WeeklyCashHoldingFormService } from './weekly-cash-holding-form.service';

describe('WeeklyCashHolding Form Service', () => {
  let service: WeeklyCashHoldingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyCashHoldingFormService);
  });

  describe('Service methods', () => {
    describe('createWeeklyCashHoldingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            fitUnits: expect.any(Object),
            unfitUnits: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            subCountyCode: expect.any(Object),
            denomination: expect.any(Object),
          })
        );
      });

      it('passing IWeeklyCashHolding should create a new form with FormGroup', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            fitUnits: expect.any(Object),
            unfitUnits: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            subCountyCode: expect.any(Object),
            denomination: expect.any(Object),
          })
        );
      });
    });

    describe('getWeeklyCashHolding', () => {
      it('should return NewWeeklyCashHolding for default WeeklyCashHolding initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithNewData);

        const weeklyCashHolding = service.getWeeklyCashHolding(formGroup) as any;

        expect(weeklyCashHolding).toMatchObject(sampleWithNewData);
      });

      it('should return NewWeeklyCashHolding for empty WeeklyCashHolding initial value', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup();

        const weeklyCashHolding = service.getWeeklyCashHolding(formGroup) as any;

        expect(weeklyCashHolding).toMatchObject({});
      });

      it('should return IWeeklyCashHolding', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithRequiredData);

        const weeklyCashHolding = service.getWeeklyCashHolding(formGroup) as any;

        expect(weeklyCashHolding).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWeeklyCashHolding should not enable id FormControl', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWeeklyCashHolding should disable id FormControl', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
