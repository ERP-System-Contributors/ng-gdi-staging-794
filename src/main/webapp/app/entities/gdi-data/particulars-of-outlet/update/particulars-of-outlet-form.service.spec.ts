import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../particulars-of-outlet.test-samples';

import { ParticularsOfOutletFormService } from './particulars-of-outlet-form.service';

describe('ParticularsOfOutlet Form Service', () => {
  let service: ParticularsOfOutletFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticularsOfOutletFormService);
  });

  describe('Service methods', () => {
    describe('createParticularsOfOutletFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createParticularsOfOutletFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessReportingDate: expect.any(Object),
            outletName: expect.any(Object),
            town: expect.any(Object),
            iso6709Latitute: expect.any(Object),
            iso6709Longitude: expect.any(Object),
            cbkApprovalDate: expect.any(Object),
            outletOpeningDate: expect.any(Object),
            outletClosureDate: expect.any(Object),
            licenseFeePayable: expect.any(Object),
            subCountyCode: expect.any(Object),
            bankCode: expect.any(Object),
            outletId: expect.any(Object),
            typeOfOutlet: expect.any(Object),
            outletStatus: expect.any(Object),
          })
        );
      });

      it('passing IParticularsOfOutlet should create a new form with FormGroup', () => {
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessReportingDate: expect.any(Object),
            outletName: expect.any(Object),
            town: expect.any(Object),
            iso6709Latitute: expect.any(Object),
            iso6709Longitude: expect.any(Object),
            cbkApprovalDate: expect.any(Object),
            outletOpeningDate: expect.any(Object),
            outletClosureDate: expect.any(Object),
            licenseFeePayable: expect.any(Object),
            subCountyCode: expect.any(Object),
            bankCode: expect.any(Object),
            outletId: expect.any(Object),
            typeOfOutlet: expect.any(Object),
            outletStatus: expect.any(Object),
          })
        );
      });
    });

    describe('getParticularsOfOutlet', () => {
      it('should return NewParticularsOfOutlet for default ParticularsOfOutlet initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithNewData);

        const particularsOfOutlet = service.getParticularsOfOutlet(formGroup) as any;

        expect(particularsOfOutlet).toMatchObject(sampleWithNewData);
      });

      it('should return NewParticularsOfOutlet for empty ParticularsOfOutlet initial value', () => {
        const formGroup = service.createParticularsOfOutletFormGroup();

        const particularsOfOutlet = service.getParticularsOfOutlet(formGroup) as any;

        expect(particularsOfOutlet).toMatchObject({});
      });

      it('should return IParticularsOfOutlet', () => {
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithRequiredData);

        const particularsOfOutlet = service.getParticularsOfOutlet(formGroup) as any;

        expect(particularsOfOutlet).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IParticularsOfOutlet should not enable id FormControl', () => {
        const formGroup = service.createParticularsOfOutletFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewParticularsOfOutlet should disable id FormControl', () => {
        const formGroup = service.createParticularsOfOutletFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
