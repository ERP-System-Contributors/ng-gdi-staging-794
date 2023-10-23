import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../issuers-of-securities.test-samples';

import { IssuersOfSecuritiesFormService } from './issuers-of-securities-form.service';

describe('IssuersOfSecurities Form Service', () => {
  let service: IssuersOfSecuritiesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuersOfSecuritiesFormService);
  });

  describe('Service methods', () => {
    describe('createIssuersOfSecuritiesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            issuerOfSecuritiesCode: expect.any(Object),
            issuerOfSecurities: expect.any(Object),
            issuerOfSecuritiesDescription: expect.any(Object),
          })
        );
      });

      it('passing IIssuersOfSecurities should create a new form with FormGroup', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            issuerOfSecuritiesCode: expect.any(Object),
            issuerOfSecurities: expect.any(Object),
            issuerOfSecuritiesDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getIssuersOfSecurities', () => {
      it('should return NewIssuersOfSecurities for default IssuersOfSecurities initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithNewData);

        const issuersOfSecurities = service.getIssuersOfSecurities(formGroup) as any;

        expect(issuersOfSecurities).toMatchObject(sampleWithNewData);
      });

      it('should return NewIssuersOfSecurities for empty IssuersOfSecurities initial value', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup();

        const issuersOfSecurities = service.getIssuersOfSecurities(formGroup) as any;

        expect(issuersOfSecurities).toMatchObject({});
      });

      it('should return IIssuersOfSecurities', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithRequiredData);

        const issuersOfSecurities = service.getIssuersOfSecurities(formGroup) as any;

        expect(issuersOfSecurities).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIssuersOfSecurities should not enable id FormControl', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIssuersOfSecurities should disable id FormControl', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
