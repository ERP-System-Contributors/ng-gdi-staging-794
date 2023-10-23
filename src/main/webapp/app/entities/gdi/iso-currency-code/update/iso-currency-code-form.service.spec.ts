import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../iso-currency-code.test-samples';

import { IsoCurrencyCodeFormService } from './iso-currency-code-form.service';

describe('IsoCurrencyCode Form Service', () => {
  let service: IsoCurrencyCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsoCurrencyCodeFormService);
  });

  describe('Service methods', () => {
    describe('createIsoCurrencyCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alphabeticCode: expect.any(Object),
            numericCode: expect.any(Object),
            minorUnit: expect.any(Object),
            currency: expect.any(Object),
            country: expect.any(Object),
          })
        );
      });

      it('passing IIsoCurrencyCode should create a new form with FormGroup', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alphabeticCode: expect.any(Object),
            numericCode: expect.any(Object),
            minorUnit: expect.any(Object),
            currency: expect.any(Object),
            country: expect.any(Object),
          })
        );
      });
    });

    describe('getIsoCurrencyCode', () => {
      it('should return NewIsoCurrencyCode for default IsoCurrencyCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithNewData);

        const isoCurrencyCode = service.getIsoCurrencyCode(formGroup) as any;

        expect(isoCurrencyCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewIsoCurrencyCode for empty IsoCurrencyCode initial value', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup();

        const isoCurrencyCode = service.getIsoCurrencyCode(formGroup) as any;

        expect(isoCurrencyCode).toMatchObject({});
      });

      it('should return IIsoCurrencyCode', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithRequiredData);

        const isoCurrencyCode = service.getIsoCurrencyCode(formGroup) as any;

        expect(isoCurrencyCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIsoCurrencyCode should not enable id FormControl', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIsoCurrencyCode should disable id FormControl', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
