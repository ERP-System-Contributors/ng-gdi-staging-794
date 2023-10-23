import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../county-sub-county-code.test-samples';

import { CountySubCountyCodeFormService } from './county-sub-county-code-form.service';

describe('CountySubCountyCode Form Service', () => {
  let service: CountySubCountyCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountySubCountyCodeFormService);
  });

  describe('Service methods', () => {
    describe('createCountySubCountyCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCountySubCountyCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subCountyCode: expect.any(Object),
            subCountyName: expect.any(Object),
            countyCode: expect.any(Object),
            countyName: expect.any(Object),
          })
        );
      });

      it('passing ICountySubCountyCode should create a new form with FormGroup', () => {
        const formGroup = service.createCountySubCountyCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subCountyCode: expect.any(Object),
            subCountyName: expect.any(Object),
            countyCode: expect.any(Object),
            countyName: expect.any(Object),
          })
        );
      });
    });

    describe('getCountySubCountyCode', () => {
      it('should return NewCountySubCountyCode for default CountySubCountyCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCountySubCountyCodeFormGroup(sampleWithNewData);

        const countySubCountyCode = service.getCountySubCountyCode(formGroup) as any;

        expect(countySubCountyCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewCountySubCountyCode for empty CountySubCountyCode initial value', () => {
        const formGroup = service.createCountySubCountyCodeFormGroup();

        const countySubCountyCode = service.getCountySubCountyCode(formGroup) as any;

        expect(countySubCountyCode).toMatchObject({});
      });

      it('should return ICountySubCountyCode', () => {
        const formGroup = service.createCountySubCountyCodeFormGroup(sampleWithRequiredData);

        const countySubCountyCode = service.getCountySubCountyCode(formGroup) as any;

        expect(countySubCountyCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICountySubCountyCode should not enable id FormControl', () => {
        const formGroup = service.createCountySubCountyCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCountySubCountyCode should disable id FormControl', () => {
        const formGroup = service.createCountySubCountyCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
