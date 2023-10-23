import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../acquiring-issuing-flag.test-samples';

import { AcquiringIssuingFlagFormService } from './acquiring-issuing-flag-form.service';

describe('AcquiringIssuingFlag Form Service', () => {
  let service: AcquiringIssuingFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcquiringIssuingFlagFormService);
  });

  describe('Service methods', () => {
    describe('createAcquiringIssuingFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAcquiringIssuingFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardAcquiringIssuingFlagCode: expect.any(Object),
            cardAcquiringIssuingDescription: expect.any(Object),
            cardAcquiringIssuingDetails: expect.any(Object),
          })
        );
      });

      it('passing IAcquiringIssuingFlag should create a new form with FormGroup', () => {
        const formGroup = service.createAcquiringIssuingFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardAcquiringIssuingFlagCode: expect.any(Object),
            cardAcquiringIssuingDescription: expect.any(Object),
            cardAcquiringIssuingDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getAcquiringIssuingFlag', () => {
      it('should return NewAcquiringIssuingFlag for default AcquiringIssuingFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAcquiringIssuingFlagFormGroup(sampleWithNewData);

        const acquiringIssuingFlag = service.getAcquiringIssuingFlag(formGroup) as any;

        expect(acquiringIssuingFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewAcquiringIssuingFlag for empty AcquiringIssuingFlag initial value', () => {
        const formGroup = service.createAcquiringIssuingFlagFormGroup();

        const acquiringIssuingFlag = service.getAcquiringIssuingFlag(formGroup) as any;

        expect(acquiringIssuingFlag).toMatchObject({});
      });

      it('should return IAcquiringIssuingFlag', () => {
        const formGroup = service.createAcquiringIssuingFlagFormGroup(sampleWithRequiredData);

        const acquiringIssuingFlag = service.getAcquiringIssuingFlag(formGroup) as any;

        expect(acquiringIssuingFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAcquiringIssuingFlag should not enable id FormControl', () => {
        const formGroup = service.createAcquiringIssuingFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAcquiringIssuingFlag should disable id FormControl', () => {
        const formGroup = service.createAcquiringIssuingFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
