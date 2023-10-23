import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-data-submitting-institutions.test-samples';

import { CrbDataSubmittingInstitutionsFormService } from './crb-data-submitting-institutions-form.service';

describe('CrbDataSubmittingInstitutions Form Service', () => {
  let service: CrbDataSubmittingInstitutionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbDataSubmittingInstitutionsFormService);
  });

  describe('Service methods', () => {
    describe('createCrbDataSubmittingInstitutionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionCode: expect.any(Object),
            institutionName: expect.any(Object),
            institutionCategory: expect.any(Object),
          })
        );
      });

      it('passing ICrbDataSubmittingInstitutions should create a new form with FormGroup', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionCode: expect.any(Object),
            institutionName: expect.any(Object),
            institutionCategory: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbDataSubmittingInstitutions', () => {
      it('should return NewCrbDataSubmittingInstitutions for default CrbDataSubmittingInstitutions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithNewData);

        const crbDataSubmittingInstitutions = service.getCrbDataSubmittingInstitutions(formGroup) as any;

        expect(crbDataSubmittingInstitutions).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbDataSubmittingInstitutions for empty CrbDataSubmittingInstitutions initial value', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup();

        const crbDataSubmittingInstitutions = service.getCrbDataSubmittingInstitutions(formGroup) as any;

        expect(crbDataSubmittingInstitutions).toMatchObject({});
      });

      it('should return ICrbDataSubmittingInstitutions', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithRequiredData);

        const crbDataSubmittingInstitutions = service.getCrbDataSubmittingInstitutions(formGroup) as any;

        expect(crbDataSubmittingInstitutions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbDataSubmittingInstitutions should not enable id FormControl', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbDataSubmittingInstitutions should disable id FormControl', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
