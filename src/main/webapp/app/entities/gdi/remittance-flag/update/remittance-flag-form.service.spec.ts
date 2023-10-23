import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../remittance-flag.test-samples';

import { RemittanceFlagFormService } from './remittance-flag-form.service';

describe('RemittanceFlag Form Service', () => {
  let service: RemittanceFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemittanceFlagFormService);
  });

  describe('Service methods', () => {
    describe('createRemittanceFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRemittanceFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            remittanceTypeFlag: expect.any(Object),
            remittanceType: expect.any(Object),
            remittanceTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IRemittanceFlag should create a new form with FormGroup', () => {
        const formGroup = service.createRemittanceFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            remittanceTypeFlag: expect.any(Object),
            remittanceType: expect.any(Object),
            remittanceTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getRemittanceFlag', () => {
      it('should return NewRemittanceFlag for default RemittanceFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRemittanceFlagFormGroup(sampleWithNewData);

        const remittanceFlag = service.getRemittanceFlag(formGroup) as any;

        expect(remittanceFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewRemittanceFlag for empty RemittanceFlag initial value', () => {
        const formGroup = service.createRemittanceFlagFormGroup();

        const remittanceFlag = service.getRemittanceFlag(formGroup) as any;

        expect(remittanceFlag).toMatchObject({});
      });

      it('should return IRemittanceFlag', () => {
        const formGroup = service.createRemittanceFlagFormGroup(sampleWithRequiredData);

        const remittanceFlag = service.getRemittanceFlag(formGroup) as any;

        expect(remittanceFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRemittanceFlag should not enable id FormControl', () => {
        const formGroup = service.createRemittanceFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRemittanceFlag should disable id FormControl', () => {
        const formGroup = service.createRemittanceFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
