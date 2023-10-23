import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICounterpartyType, NewCounterpartyType } from '../counterparty-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICounterpartyType for edit and NewCounterpartyTypeFormGroupInput for create.
 */
type CounterpartyTypeFormGroupInput = ICounterpartyType | PartialWithRequiredKeyOf<NewCounterpartyType>;

type CounterpartyTypeFormDefaults = Pick<NewCounterpartyType, 'id'>;

type CounterpartyTypeFormGroupContent = {
  id: FormControl<ICounterpartyType['id'] | NewCounterpartyType['id']>;
  counterpartyTypeCode: FormControl<ICounterpartyType['counterpartyTypeCode']>;
  counterPartyType: FormControl<ICounterpartyType['counterPartyType']>;
  counterpartyTypeDescription: FormControl<ICounterpartyType['counterpartyTypeDescription']>;
};

export type CounterpartyTypeFormGroup = FormGroup<CounterpartyTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CounterpartyTypeFormService {
  createCounterpartyTypeFormGroup(counterpartyType: CounterpartyTypeFormGroupInput = { id: null }): CounterpartyTypeFormGroup {
    const counterpartyTypeRawValue = {
      ...this.getFormDefaults(),
      ...counterpartyType,
    };
    return new FormGroup<CounterpartyTypeFormGroupContent>({
      id: new FormControl(
        { value: counterpartyTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      counterpartyTypeCode: new FormControl(counterpartyTypeRawValue.counterpartyTypeCode, {
        validators: [Validators.required],
      }),
      counterPartyType: new FormControl(counterpartyTypeRawValue.counterPartyType, {
        validators: [Validators.required],
      }),
      counterpartyTypeDescription: new FormControl(counterpartyTypeRawValue.counterpartyTypeDescription),
    });
  }

  getCounterpartyType(form: CounterpartyTypeFormGroup): ICounterpartyType | NewCounterpartyType {
    return form.getRawValue() as ICounterpartyType | NewCounterpartyType;
  }

  resetForm(form: CounterpartyTypeFormGroup, counterpartyType: CounterpartyTypeFormGroupInput): void {
    const counterpartyTypeRawValue = { ...this.getFormDefaults(), ...counterpartyType };
    form.reset(
      {
        ...counterpartyTypeRawValue,
        id: { value: counterpartyTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CounterpartyTypeFormDefaults {
    return {
      id: null,
    };
  }
}
