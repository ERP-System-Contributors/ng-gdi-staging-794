import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../weekly-counterfeit-holding.test-samples';

import { WeeklyCounterfeitHoldingFormService } from './weekly-counterfeit-holding-form.service';

describe('WeeklyCounterfeitHolding Form Service', () => {
  let service: WeeklyCounterfeitHoldingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyCounterfeitHoldingFormService);
  });

  describe('Service methods', () => {
    describe('createWeeklyCounterfeitHoldingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWeeklyCounterfeitHoldingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            dateConfiscated: expect.any(Object),
            serialNumber: expect.any(Object),
            depositorsNames: expect.any(Object),
            tellersNames: expect.any(Object),
            dateSubmittedToCBK: expect.any(Object),
            remarks: expect.any(Object),
          })
        );
      });

      it('passing IWeeklyCounterfeitHolding should create a new form with FormGroup', () => {
        const formGroup = service.createWeeklyCounterfeitHoldingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            dateConfiscated: expect.any(Object),
            serialNumber: expect.any(Object),
            depositorsNames: expect.any(Object),
            tellersNames: expect.any(Object),
            dateSubmittedToCBK: expect.any(Object),
            remarks: expect.any(Object),
          })
        );
      });
    });

    describe('getWeeklyCounterfeitHolding', () => {
      it('should return NewWeeklyCounterfeitHolding for default WeeklyCounterfeitHolding initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWeeklyCounterfeitHoldingFormGroup(sampleWithNewData);

        const weeklyCounterfeitHolding = service.getWeeklyCounterfeitHolding(formGroup) as any;

        expect(weeklyCounterfeitHolding).toMatchObject(sampleWithNewData);
      });

      it('should return NewWeeklyCounterfeitHolding for empty WeeklyCounterfeitHolding initial value', () => {
        const formGroup = service.createWeeklyCounterfeitHoldingFormGroup();

        const weeklyCounterfeitHolding = service.getWeeklyCounterfeitHolding(formGroup) as any;

        expect(weeklyCounterfeitHolding).toMatchObject({});
      });

      it('should return IWeeklyCounterfeitHolding', () => {
        const formGroup = service.createWeeklyCounterfeitHoldingFormGroup(sampleWithRequiredData);

        const weeklyCounterfeitHolding = service.getWeeklyCounterfeitHolding(formGroup) as any;

        expect(weeklyCounterfeitHolding).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWeeklyCounterfeitHolding should not enable id FormControl', () => {
        const formGroup = service.createWeeklyCounterfeitHoldingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWeeklyCounterfeitHolding should disable id FormControl', () => {
        const formGroup = service.createWeeklyCounterfeitHoldingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
