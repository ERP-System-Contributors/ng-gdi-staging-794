import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sna-sector-code.test-samples';

import { SnaSectorCodeFormService } from './sna-sector-code-form.service';

describe('SnaSectorCode Form Service', () => {
  let service: SnaSectorCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnaSectorCodeFormService);
  });

  describe('Service methods', () => {
    describe('createSnaSectorCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSnaSectorCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sectorTypeCode: expect.any(Object),
            mainSectorCode: expect.any(Object),
            mainSectorTypeName: expect.any(Object),
            subSectorCode: expect.any(Object),
            subSectorName: expect.any(Object),
            subSubSectorCode: expect.any(Object),
            subSubSectorName: expect.any(Object),
          })
        );
      });

      it('passing ISnaSectorCode should create a new form with FormGroup', () => {
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sectorTypeCode: expect.any(Object),
            mainSectorCode: expect.any(Object),
            mainSectorTypeName: expect.any(Object),
            subSectorCode: expect.any(Object),
            subSectorName: expect.any(Object),
            subSubSectorCode: expect.any(Object),
            subSubSectorName: expect.any(Object),
          })
        );
      });
    });

    describe('getSnaSectorCode', () => {
      it('should return NewSnaSectorCode for default SnaSectorCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithNewData);

        const snaSectorCode = service.getSnaSectorCode(formGroup) as any;

        expect(snaSectorCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewSnaSectorCode for empty SnaSectorCode initial value', () => {
        const formGroup = service.createSnaSectorCodeFormGroup();

        const snaSectorCode = service.getSnaSectorCode(formGroup) as any;

        expect(snaSectorCode).toMatchObject({});
      });

      it('should return ISnaSectorCode', () => {
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithRequiredData);

        const snaSectorCode = service.getSnaSectorCode(formGroup) as any;

        expect(snaSectorCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISnaSectorCode should not enable id FormControl', () => {
        const formGroup = service.createSnaSectorCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSnaSectorCode should disable id FormControl', () => {
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
