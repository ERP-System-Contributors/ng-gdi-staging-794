import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICounterPartyDealType, NewCounterPartyDealType } from '../counter-party-deal-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICounterPartyDealType for edit and NewCounterPartyDealTypeFormGroupInput for create.
 */
type CounterPartyDealTypeFormGroupInput = ICounterPartyDealType | PartialWithRequiredKeyOf<NewCounterPartyDealType>;

type CounterPartyDealTypeFormDefaults = Pick<NewCounterPartyDealType, 'id'>;

type CounterPartyDealTypeFormGroupContent = {
  id: FormControl<ICounterPartyDealType['id'] | NewCounterPartyDealType['id']>;
  counterpartyDealCode: FormControl<ICounterPartyDealType['counterpartyDealCode']>;
  counterpartyDealTypeDetails: FormControl<ICounterPartyDealType['counterpartyDealTypeDetails']>;
  counterpartyDealTypeDescription: FormControl<ICounterPartyDealType['counterpartyDealTypeDescription']>;
};

export type CounterPartyDealTypeFormGroup = FormGroup<CounterPartyDealTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CounterPartyDealTypeFormService {
  createCounterPartyDealTypeFormGroup(
    counterPartyDealType: CounterPartyDealTypeFormGroupInput = { id: null }
  ): CounterPartyDealTypeFormGroup {
    const counterPartyDealTypeRawValue = {
      ...this.getFormDefaults(),
      ...counterPartyDealType,
    };
    return new FormGroup<CounterPartyDealTypeFormGroupContent>({
      id: new FormControl(
        { value: counterPartyDealTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      counterpartyDealCode: new FormControl(counterPartyDealTypeRawValue.counterpartyDealCode, {
        validators: [Validators.required],
      }),
      counterpartyDealTypeDetails: new FormControl(counterPartyDealTypeRawValue.counterpartyDealTypeDetails, {
        validators: [Validators.required],
      }),
      counterpartyDealTypeDescription: new FormControl(counterPartyDealTypeRawValue.counterpartyDealTypeDescription),
    });
  }

  getCounterPartyDealType(form: CounterPartyDealTypeFormGroup): ICounterPartyDealType | NewCounterPartyDealType {
    return form.getRawValue() as ICounterPartyDealType | NewCounterPartyDealType;
  }

  resetForm(form: CounterPartyDealTypeFormGroup, counterPartyDealType: CounterPartyDealTypeFormGroupInput): void {
    const counterPartyDealTypeRawValue = { ...this.getFormDefaults(), ...counterPartyDealType };
    form.reset(
      {
        ...counterPartyDealTypeRawValue,
        id: { value: counterPartyDealTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CounterPartyDealTypeFormDefaults {
    return {
      id: null,
    };
  }
}
