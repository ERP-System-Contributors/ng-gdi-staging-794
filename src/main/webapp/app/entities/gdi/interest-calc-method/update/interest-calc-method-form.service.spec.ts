import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../interest-calc-method.test-samples';

import { InterestCalcMethodFormService } from './interest-calc-method-form.service';

describe('InterestCalcMethod Form Service', () => {
  let service: InterestCalcMethodFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestCalcMethodFormService);
  });

  describe('Service methods', () => {
    describe('createInterestCalcMethodFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInterestCalcMethodFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            interestCalculationMethodCode: expect.any(Object),
            interestCalculationMthodType: expect.any(Object),
            interestCalculationMethodDetails: expect.any(Object),
          })
        );
      });

      it('passing IInterestCalcMethod should create a new form with FormGroup', () => {
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            interestCalculationMethodCode: expect.any(Object),
            interestCalculationMthodType: expect.any(Object),
            interestCalculationMethodDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getInterestCalcMethod', () => {
      it('should return NewInterestCalcMethod for default InterestCalcMethod initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithNewData);

        const interestCalcMethod = service.getInterestCalcMethod(formGroup) as any;

        expect(interestCalcMethod).toMatchObject(sampleWithNewData);
      });

      it('should return NewInterestCalcMethod for empty InterestCalcMethod initial value', () => {
        const formGroup = service.createInterestCalcMethodFormGroup();

        const interestCalcMethod = service.getInterestCalcMethod(formGroup) as any;

        expect(interestCalcMethod).toMatchObject({});
      });

      it('should return IInterestCalcMethod', () => {
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithRequiredData);

        const interestCalcMethod = service.getInterestCalcMethod(formGroup) as any;

        expect(interestCalcMethod).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInterestCalcMethod should not enable id FormControl', () => {
        const formGroup = service.createInterestCalcMethodFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInterestCalcMethod should disable id FormControl', () => {
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
