import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICurrencyServiceabilityFlag, NewCurrencyServiceabilityFlag } from '../currency-serviceability-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICurrencyServiceabilityFlag for edit and NewCurrencyServiceabilityFlagFormGroupInput for create.
 */
type CurrencyServiceabilityFlagFormGroupInput = ICurrencyServiceabilityFlag | PartialWithRequiredKeyOf<NewCurrencyServiceabilityFlag>;

type CurrencyServiceabilityFlagFormDefaults = Pick<NewCurrencyServiceabilityFlag, 'id'>;

type CurrencyServiceabilityFlagFormGroupContent = {
  id: FormControl<ICurrencyServiceabilityFlag['id'] | NewCurrencyServiceabilityFlag['id']>;
  currencyServiceabilityFlag: FormControl<ICurrencyServiceabilityFlag['currencyServiceabilityFlag']>;
  currencyServiceability: FormControl<ICurrencyServiceabilityFlag['currencyServiceability']>;
  currencyServiceabilityFlagDetails: FormControl<ICurrencyServiceabilityFlag['currencyServiceabilityFlagDetails']>;
};

export type CurrencyServiceabilityFlagFormGroup = FormGroup<CurrencyServiceabilityFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CurrencyServiceabilityFlagFormService {
  createCurrencyServiceabilityFlagFormGroup(
    currencyServiceabilityFlag: CurrencyServiceabilityFlagFormGroupInput = { id: null }
  ): CurrencyServiceabilityFlagFormGroup {
    const currencyServiceabilityFlagRawValue = {
      ...this.getFormDefaults(),
      ...currencyServiceabilityFlag,
    };
    return new FormGroup<CurrencyServiceabilityFlagFormGroupContent>({
      id: new FormControl(
        { value: currencyServiceabilityFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      currencyServiceabilityFlag: new FormControl(currencyServiceabilityFlagRawValue.currencyServiceabilityFlag, {
        validators: [Validators.required],
      }),
      currencyServiceability: new FormControl(currencyServiceabilityFlagRawValue.currencyServiceability, {
        validators: [Validators.required],
      }),
      currencyServiceabilityFlagDetails: new FormControl(currencyServiceabilityFlagRawValue.currencyServiceabilityFlagDetails),
    });
  }

  getCurrencyServiceabilityFlag(form: CurrencyServiceabilityFlagFormGroup): ICurrencyServiceabilityFlag | NewCurrencyServiceabilityFlag {
    return form.getRawValue() as ICurrencyServiceabilityFlag | NewCurrencyServiceabilityFlag;
  }

  resetForm(form: CurrencyServiceabilityFlagFormGroup, currencyServiceabilityFlag: CurrencyServiceabilityFlagFormGroupInput): void {
    const currencyServiceabilityFlagRawValue = { ...this.getFormDefaults(), ...currencyServiceabilityFlag };
    form.reset(
      {
        ...currencyServiceabilityFlagRawValue,
        id: { value: currencyServiceabilityFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CurrencyServiceabilityFlagFormDefaults {
    return {
      id: null,
    };
  }
}
