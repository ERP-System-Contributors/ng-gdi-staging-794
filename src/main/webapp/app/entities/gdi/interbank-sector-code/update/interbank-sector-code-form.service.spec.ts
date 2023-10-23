import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../interbank-sector-code.test-samples';

import { InterbankSectorCodeFormService } from './interbank-sector-code-form.service';

describe('InterbankSectorCode Form Service', () => {
  let service: InterbankSectorCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterbankSectorCodeFormService);
  });

  describe('Service methods', () => {
    describe('createInterbankSectorCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInterbankSectorCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            interbankSectorCode: expect.any(Object),
            interbankSectorCodeDescription: expect.any(Object),
          })
        );
      });

      it('passing IInterbankSectorCode should create a new form with FormGroup', () => {
        const formGroup = service.createInterbankSectorCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            interbankSectorCode: expect.any(Object),
            interbankSectorCodeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getInterbankSectorCode', () => {
      it('should return NewInterbankSectorCode for default InterbankSectorCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInterbankSectorCodeFormGroup(sampleWithNewData);

        const interbankSectorCode = service.getInterbankSectorCode(formGroup) as any;

        expect(interbankSectorCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewInterbankSectorCode for empty InterbankSectorCode initial value', () => {
        const formGroup = service.createInterbankSectorCodeFormGroup();

        const interbankSectorCode = service.getInterbankSectorCode(formGroup) as any;

        expect(interbankSectorCode).toMatchObject({});
      });

      it('should return IInterbankSectorCode', () => {
        const formGroup = service.createInterbankSectorCodeFormGroup(sampleWithRequiredData);

        const interbankSectorCode = service.getInterbankSectorCode(formGroup) as any;

        expect(interbankSectorCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInterbankSectorCode should not enable id FormControl', () => {
        const formGroup = service.createInterbankSectorCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInterbankSectorCode should disable id FormControl', () => {
        const formGroup = service.createInterbankSectorCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
