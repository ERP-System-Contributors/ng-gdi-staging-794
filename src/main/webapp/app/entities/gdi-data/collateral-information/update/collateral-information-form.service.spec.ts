import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../collateral-information.test-samples';

import { CollateralInformationFormService } from './collateral-information-form.service';

describe('CollateralInformation Form Service', () => {
  let service: CollateralInformationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollateralInformationFormService);
  });

  describe('Service methods', () => {
    describe('createCollateralInformationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCollateralInformationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            collateralId: expect.any(Object),
            loanContractId: expect.any(Object),
            customerId: expect.any(Object),
            registrationPropertyNumber: expect.any(Object),
            collateralOMVInCCY: expect.any(Object),
            collateralFSVInLCY: expect.any(Object),
            collateralDiscountedValue: expect.any(Object),
            amountCharged: expect.any(Object),
            collateralDiscountRate: expect.any(Object),
            loanToValueRatio: expect.any(Object),
            nameOfPropertyValuer: expect.any(Object),
            collateralLastValuationDate: expect.any(Object),
            insuredFlag: expect.any(Object),
            nameOfInsurer: expect.any(Object),
            amountInsured: expect.any(Object),
            insuranceExpiryDate: expect.any(Object),
            guaranteeInsurers: expect.any(Object),
            bankCode: expect.any(Object),
            branchCode: expect.any(Object),
            collateralType: expect.any(Object),
            countyCode: expect.any(Object),
          })
        );
      });

      it('passing ICollateralInformation should create a new form with FormGroup', () => {
        const formGroup = service.createCollateralInformationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            collateralId: expect.any(Object),
            loanContractId: expect.any(Object),
            customerId: expect.any(Object),
            registrationPropertyNumber: expect.any(Object),
            collateralOMVInCCY: expect.any(Object),
            collateralFSVInLCY: expect.any(Object),
            collateralDiscountedValue: expect.any(Object),
            amountCharged: expect.any(Object),
            collateralDiscountRate: expect.any(Object),
            loanToValueRatio: expect.any(Object),
            nameOfPropertyValuer: expect.any(Object),
            collateralLastValuationDate: expect.any(Object),
            insuredFlag: expect.any(Object),
            nameOfInsurer: expect.any(Object),
            amountInsured: expect.any(Object),
            insuranceExpiryDate: expect.any(Object),
            guaranteeInsurers: expect.any(Object),
            bankCode: expect.any(Object),
            branchCode: expect.any(Object),
            collateralType: expect.any(Object),
            countyCode: expect.any(Object),
          })
        );
      });
    });

    describe('getCollateralInformation', () => {
      it('should return NewCollateralInformation for default CollateralInformation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCollateralInformationFormGroup(sampleWithNewData);

        const collateralInformation = service.getCollateralInformation(formGroup) as any;

        expect(collateralInformation).toMatchObject(sampleWithNewData);
      });

      it('should return NewCollateralInformation for empty CollateralInformation initial value', () => {
        const formGroup = service.createCollateralInformationFormGroup();

        const collateralInformation = service.getCollateralInformation(formGroup) as any;

        expect(collateralInformation).toMatchObject({});
      });

      it('should return ICollateralInformation', () => {
        const formGroup = service.createCollateralInformationFormGroup(sampleWithRequiredData);

        const collateralInformation = service.getCollateralInformation(formGroup) as any;

        expect(collateralInformation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICollateralInformation should not enable id FormControl', () => {
        const formGroup = service.createCollateralInformationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCollateralInformation should disable id FormControl', () => {
        const formGroup = service.createCollateralInformationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
