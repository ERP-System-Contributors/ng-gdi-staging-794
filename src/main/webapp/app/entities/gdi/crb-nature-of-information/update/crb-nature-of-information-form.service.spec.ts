import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-nature-of-information.test-samples';

import { CrbNatureOfInformationFormService } from './crb-nature-of-information-form.service';

describe('CrbNatureOfInformation Form Service', () => {
  let service: CrbNatureOfInformationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbNatureOfInformationFormService);
  });

  describe('Service methods', () => {
    describe('createCrbNatureOfInformationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfInformationTypeCode: expect.any(Object),
            natureOfInformationType: expect.any(Object),
            natureOfInformationTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbNatureOfInformation should create a new form with FormGroup', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfInformationTypeCode: expect.any(Object),
            natureOfInformationType: expect.any(Object),
            natureOfInformationTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbNatureOfInformation', () => {
      it('should return NewCrbNatureOfInformation for default CrbNatureOfInformation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithNewData);

        const crbNatureOfInformation = service.getCrbNatureOfInformation(formGroup) as any;

        expect(crbNatureOfInformation).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbNatureOfInformation for empty CrbNatureOfInformation initial value', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup();

        const crbNatureOfInformation = service.getCrbNatureOfInformation(formGroup) as any;

        expect(crbNatureOfInformation).toMatchObject({});
      });

      it('should return ICrbNatureOfInformation', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithRequiredData);

        const crbNatureOfInformation = service.getCrbNatureOfInformation(formGroup) as any;

        expect(crbNatureOfInformation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbNatureOfInformation should not enable id FormControl', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbNatureOfInformation should disable id FormControl', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
