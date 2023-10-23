import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICollateralInformation, NewCollateralInformation } from '../collateral-information.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICollateralInformation for edit and NewCollateralInformationFormGroupInput for create.
 */
type CollateralInformationFormGroupInput = ICollateralInformation | PartialWithRequiredKeyOf<NewCollateralInformation>;

type CollateralInformationFormDefaults = Pick<NewCollateralInformation, 'id'>;

type CollateralInformationFormGroupContent = {
  id: FormControl<ICollateralInformation['id'] | NewCollateralInformation['id']>;
  reportingDate: FormControl<ICollateralInformation['reportingDate']>;
  collateralId: FormControl<ICollateralInformation['collateralId']>;
  loanContractId: FormControl<ICollateralInformation['loanContractId']>;
  customerId: FormControl<ICollateralInformation['customerId']>;
  registrationPropertyNumber: FormControl<ICollateralInformation['registrationPropertyNumber']>;
  collateralOMVInCCY: FormControl<ICollateralInformation['collateralOMVInCCY']>;
  collateralFSVInLCY: FormControl<ICollateralInformation['collateralFSVInLCY']>;
  collateralDiscountedValue: FormControl<ICollateralInformation['collateralDiscountedValue']>;
  amountCharged: FormControl<ICollateralInformation['amountCharged']>;
  collateralDiscountRate: FormControl<ICollateralInformation['collateralDiscountRate']>;
  loanToValueRatio: FormControl<ICollateralInformation['loanToValueRatio']>;
  nameOfPropertyValuer: FormControl<ICollateralInformation['nameOfPropertyValuer']>;
  collateralLastValuationDate: FormControl<ICollateralInformation['collateralLastValuationDate']>;
  insuredFlag: FormControl<ICollateralInformation['insuredFlag']>;
  nameOfInsurer: FormControl<ICollateralInformation['nameOfInsurer']>;
  amountInsured: FormControl<ICollateralInformation['amountInsured']>;
  insuranceExpiryDate: FormControl<ICollateralInformation['insuranceExpiryDate']>;
  guaranteeInsurers: FormControl<ICollateralInformation['guaranteeInsurers']>;
  bankCode: FormControl<ICollateralInformation['bankCode']>;
  branchCode: FormControl<ICollateralInformation['branchCode']>;
  collateralType: FormControl<ICollateralInformation['collateralType']>;
  countyCode: FormControl<ICollateralInformation['countyCode']>;
};

export type CollateralInformationFormGroup = FormGroup<CollateralInformationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CollateralInformationFormService {
  createCollateralInformationFormGroup(
    collateralInformation: CollateralInformationFormGroupInput = { id: null }
  ): CollateralInformationFormGroup {
    const collateralInformationRawValue = {
      ...this.getFormDefaults(),
      ...collateralInformation,
    };
    return new FormGroup<CollateralInformationFormGroupContent>({
      id: new FormControl(
        { value: collateralInformationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(collateralInformationRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      collateralId: new FormControl(collateralInformationRawValue.collateralId, {
        validators: [Validators.required],
      }),
      loanContractId: new FormControl(collateralInformationRawValue.loanContractId, {
        validators: [Validators.required, Validators.pattern('^\\d{15}$')],
      }),
      customerId: new FormControl(collateralInformationRawValue.customerId, {
        validators: [Validators.required],
      }),
      registrationPropertyNumber: new FormControl(collateralInformationRawValue.registrationPropertyNumber),
      collateralOMVInCCY: new FormControl(collateralInformationRawValue.collateralOMVInCCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      collateralFSVInLCY: new FormControl(collateralInformationRawValue.collateralFSVInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      collateralDiscountedValue: new FormControl(collateralInformationRawValue.collateralDiscountedValue, {
        validators: [Validators.min(0)],
      }),
      amountCharged: new FormControl(collateralInformationRawValue.amountCharged, {
        validators: [Validators.required, Validators.min(0)],
      }),
      collateralDiscountRate: new FormControl(collateralInformationRawValue.collateralDiscountRate, {
        validators: [Validators.min(0)],
      }),
      loanToValueRatio: new FormControl(collateralInformationRawValue.loanToValueRatio, {
        validators: [Validators.min(0)],
      }),
      nameOfPropertyValuer: new FormControl(collateralInformationRawValue.nameOfPropertyValuer),
      collateralLastValuationDate: new FormControl(collateralInformationRawValue.collateralLastValuationDate),
      insuredFlag: new FormControl(collateralInformationRawValue.insuredFlag, {
        validators: [Validators.required],
      }),
      nameOfInsurer: new FormControl(collateralInformationRawValue.nameOfInsurer),
      amountInsured: new FormControl(collateralInformationRawValue.amountInsured, {
        validators: [Validators.min(0)],
      }),
      insuranceExpiryDate: new FormControl(collateralInformationRawValue.insuranceExpiryDate),
      guaranteeInsurers: new FormControl(collateralInformationRawValue.guaranteeInsurers),
      bankCode: new FormControl(collateralInformationRawValue.bankCode, {
        validators: [Validators.required],
      }),
      branchCode: new FormControl(collateralInformationRawValue.branchCode, {
        validators: [Validators.required],
      }),
      collateralType: new FormControl(collateralInformationRawValue.collateralType, {
        validators: [Validators.required],
      }),
      countyCode: new FormControl(collateralInformationRawValue.countyCode),
    });
  }

  getCollateralInformation(form: CollateralInformationFormGroup): ICollateralInformation | NewCollateralInformation {
    return form.getRawValue() as ICollateralInformation | NewCollateralInformation;
  }

  resetForm(form: CollateralInformationFormGroup, collateralInformation: CollateralInformationFormGroupInput): void {
    const collateralInformationRawValue = { ...this.getFormDefaults(), ...collateralInformation };
    form.reset(
      {
        ...collateralInformationRawValue,
        id: { value: collateralInformationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CollateralInformationFormDefaults {
    return {
      id: null,
    };
  }
}
