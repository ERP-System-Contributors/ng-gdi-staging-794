import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-source-of-information-type.test-samples';

import { CrbSourceOfInformationTypeFormService } from './crb-source-of-information-type-form.service';

describe('CrbSourceOfInformationType Form Service', () => {
  let service: CrbSourceOfInformationTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbSourceOfInformationTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbSourceOfInformationTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOfInformationTypeCode: expect.any(Object),
            sourceOfInformationTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbSourceOfInformationType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOfInformationTypeCode: expect.any(Object),
            sourceOfInformationTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbSourceOfInformationType', () => {
      it('should return NewCrbSourceOfInformationType for default CrbSourceOfInformationType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithNewData);

        const crbSourceOfInformationType = service.getCrbSourceOfInformationType(formGroup) as any;

        expect(crbSourceOfInformationType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbSourceOfInformationType for empty CrbSourceOfInformationType initial value', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup();

        const crbSourceOfInformationType = service.getCrbSourceOfInformationType(formGroup) as any;

        expect(crbSourceOfInformationType).toMatchObject({});
      });

      it('should return ICrbSourceOfInformationType', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithRequiredData);

        const crbSourceOfInformationType = service.getCrbSourceOfInformationType(formGroup) as any;

        expect(crbSourceOfInformationType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbSourceOfInformationType should not enable id FormControl', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbSourceOfInformationType should disable id FormControl', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
