import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IKenyanCurrencyDenomination, NewKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKenyanCurrencyDenomination for edit and NewKenyanCurrencyDenominationFormGroupInput for create.
 */
type KenyanCurrencyDenominationFormGroupInput = IKenyanCurrencyDenomination | PartialWithRequiredKeyOf<NewKenyanCurrencyDenomination>;

type KenyanCurrencyDenominationFormDefaults = Pick<NewKenyanCurrencyDenomination, 'id'>;

type KenyanCurrencyDenominationFormGroupContent = {
  id: FormControl<IKenyanCurrencyDenomination['id'] | NewKenyanCurrencyDenomination['id']>;
  currencyDenominationCode: FormControl<IKenyanCurrencyDenomination['currencyDenominationCode']>;
  currencyDenominationType: FormControl<IKenyanCurrencyDenomination['currencyDenominationType']>;
  currencyDenominationTypeDetails: FormControl<IKenyanCurrencyDenomination['currencyDenominationTypeDetails']>;
};

export type KenyanCurrencyDenominationFormGroup = FormGroup<KenyanCurrencyDenominationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KenyanCurrencyDenominationFormService {
  createKenyanCurrencyDenominationFormGroup(
    kenyanCurrencyDenomination: KenyanCurrencyDenominationFormGroupInput = { id: null }
  ): KenyanCurrencyDenominationFormGroup {
    const kenyanCurrencyDenominationRawValue = {
      ...this.getFormDefaults(),
      ...kenyanCurrencyDenomination,
    };
    return new FormGroup<KenyanCurrencyDenominationFormGroupContent>({
      id: new FormControl(
        { value: kenyanCurrencyDenominationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      currencyDenominationCode: new FormControl(kenyanCurrencyDenominationRawValue.currencyDenominationCode, {
        validators: [Validators.required],
      }),
      currencyDenominationType: new FormControl(kenyanCurrencyDenominationRawValue.currencyDenominationType, {
        validators: [Validators.required],
      }),
      currencyDenominationTypeDetails: new FormControl(kenyanCurrencyDenominationRawValue.currencyDenominationTypeDetails),
    });
  }

  getKenyanCurrencyDenomination(form: KenyanCurrencyDenominationFormGroup): IKenyanCurrencyDenomination | NewKenyanCurrencyDenomination {
    return form.getRawValue() as IKenyanCurrencyDenomination | NewKenyanCurrencyDenomination;
  }

  resetForm(form: KenyanCurrencyDenominationFormGroup, kenyanCurrencyDenomination: KenyanCurrencyDenominationFormGroupInput): void {
    const kenyanCurrencyDenominationRawValue = { ...this.getFormDefaults(), ...kenyanCurrencyDenomination };
    form.reset(
      {
        ...kenyanCurrencyDenominationRawValue,
        id: { value: kenyanCurrencyDenominationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): KenyanCurrencyDenominationFormDefaults {
    return {
      id: null,
    };
  }
}
