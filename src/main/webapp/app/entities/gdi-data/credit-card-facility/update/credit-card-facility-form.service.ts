import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICreditCardFacility, NewCreditCardFacility } from '../credit-card-facility.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICreditCardFacility for edit and NewCreditCardFacilityFormGroupInput for create.
 */
type CreditCardFacilityFormGroupInput = ICreditCardFacility | PartialWithRequiredKeyOf<NewCreditCardFacility>;

type CreditCardFacilityFormDefaults = Pick<NewCreditCardFacility, 'id'>;

type CreditCardFacilityFormGroupContent = {
  id: FormControl<ICreditCardFacility['id'] | NewCreditCardFacility['id']>;
  reportingDate: FormControl<ICreditCardFacility['reportingDate']>;
  totalNumberOfActiveCreditCards: FormControl<ICreditCardFacility['totalNumberOfActiveCreditCards']>;
  totalCreditCardLimitsInCCY: FormControl<ICreditCardFacility['totalCreditCardLimitsInCCY']>;
  totalCreditCardLimitsInLCY: FormControl<ICreditCardFacility['totalCreditCardLimitsInLCY']>;
  totalCreditCardAmountUtilisedInCCY: FormControl<ICreditCardFacility['totalCreditCardAmountUtilisedInCCY']>;
  totalCreditCardAmountUtilisedInLcy: FormControl<ICreditCardFacility['totalCreditCardAmountUtilisedInLcy']>;
  totalNPACreditCardAmountInFCY: FormControl<ICreditCardFacility['totalNPACreditCardAmountInFCY']>;
  totalNPACreditCardAmountInLCY: FormControl<ICreditCardFacility['totalNPACreditCardAmountInLCY']>;
  bankCode: FormControl<ICreditCardFacility['bankCode']>;
  customerCategory: FormControl<ICreditCardFacility['customerCategory']>;
  currencyCode: FormControl<ICreditCardFacility['currencyCode']>;
};

export type CreditCardFacilityFormGroup = FormGroup<CreditCardFacilityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CreditCardFacilityFormService {
  createCreditCardFacilityFormGroup(creditCardFacility: CreditCardFacilityFormGroupInput = { id: null }): CreditCardFacilityFormGroup {
    const creditCardFacilityRawValue = {
      ...this.getFormDefaults(),
      ...creditCardFacility,
    };
    return new FormGroup<CreditCardFacilityFormGroupContent>({
      id: new FormControl(
        { value: creditCardFacilityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(creditCardFacilityRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      totalNumberOfActiveCreditCards: new FormControl(creditCardFacilityRawValue.totalNumberOfActiveCreditCards, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalCreditCardLimitsInCCY: new FormControl(creditCardFacilityRawValue.totalCreditCardLimitsInCCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalCreditCardLimitsInLCY: new FormControl(creditCardFacilityRawValue.totalCreditCardLimitsInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalCreditCardAmountUtilisedInCCY: new FormControl(creditCardFacilityRawValue.totalCreditCardAmountUtilisedInCCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalCreditCardAmountUtilisedInLcy: new FormControl(creditCardFacilityRawValue.totalCreditCardAmountUtilisedInLcy, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalNPACreditCardAmountInFCY: new FormControl(creditCardFacilityRawValue.totalNPACreditCardAmountInFCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalNPACreditCardAmountInLCY: new FormControl(creditCardFacilityRawValue.totalNPACreditCardAmountInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      bankCode: new FormControl(creditCardFacilityRawValue.bankCode, {
        validators: [Validators.required],
      }),
      customerCategory: new FormControl(creditCardFacilityRawValue.customerCategory, {
        validators: [Validators.required],
      }),
      currencyCode: new FormControl(creditCardFacilityRawValue.currencyCode, {
        validators: [Validators.required],
      }),
    });
  }

  getCreditCardFacility(form: CreditCardFacilityFormGroup): ICreditCardFacility | NewCreditCardFacility {
    return form.getRawValue() as ICreditCardFacility | NewCreditCardFacility;
  }

  resetForm(form: CreditCardFacilityFormGroup, creditCardFacility: CreditCardFacilityFormGroupInput): void {
    const creditCardFacilityRawValue = { ...this.getFormDefaults(), ...creditCardFacility };
    form.reset(
      {
        ...creditCardFacilityRawValue,
        id: { value: creditCardFacilityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CreditCardFacilityFormDefaults {
    return {
      id: null,
    };
  }
}
