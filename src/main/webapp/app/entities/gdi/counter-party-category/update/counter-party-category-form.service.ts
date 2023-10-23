import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICounterPartyCategory, NewCounterPartyCategory } from '../counter-party-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICounterPartyCategory for edit and NewCounterPartyCategoryFormGroupInput for create.
 */
type CounterPartyCategoryFormGroupInput = ICounterPartyCategory | PartialWithRequiredKeyOf<NewCounterPartyCategory>;

type CounterPartyCategoryFormDefaults = Pick<NewCounterPartyCategory, 'id'>;

type CounterPartyCategoryFormGroupContent = {
  id: FormControl<ICounterPartyCategory['id'] | NewCounterPartyCategory['id']>;
  counterpartyCategoryCode: FormControl<ICounterPartyCategory['counterpartyCategoryCode']>;
  counterpartyCategoryCodeDetails: FormControl<ICounterPartyCategory['counterpartyCategoryCodeDetails']>;
  counterpartyCategoryDescription: FormControl<ICounterPartyCategory['counterpartyCategoryDescription']>;
};

export type CounterPartyCategoryFormGroup = FormGroup<CounterPartyCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CounterPartyCategoryFormService {
  createCounterPartyCategoryFormGroup(
    counterPartyCategory: CounterPartyCategoryFormGroupInput = { id: null }
  ): CounterPartyCategoryFormGroup {
    const counterPartyCategoryRawValue = {
      ...this.getFormDefaults(),
      ...counterPartyCategory,
    };
    return new FormGroup<CounterPartyCategoryFormGroupContent>({
      id: new FormControl(
        { value: counterPartyCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      counterpartyCategoryCode: new FormControl(counterPartyCategoryRawValue.counterpartyCategoryCode, {
        validators: [Validators.required],
      }),
      counterpartyCategoryCodeDetails: new FormControl(counterPartyCategoryRawValue.counterpartyCategoryCodeDetails, {
        validators: [Validators.required],
      }),
      counterpartyCategoryDescription: new FormControl(counterPartyCategoryRawValue.counterpartyCategoryDescription),
    });
  }

  getCounterPartyCategory(form: CounterPartyCategoryFormGroup): ICounterPartyCategory | NewCounterPartyCategory {
    return form.getRawValue() as ICounterPartyCategory | NewCounterPartyCategory;
  }

  resetForm(form: CounterPartyCategoryFormGroup, counterPartyCategory: CounterPartyCategoryFormGroupInput): void {
    const counterPartyCategoryRawValue = { ...this.getFormDefaults(), ...counterPartyCategory };
    form.reset(
      {
        ...counterPartyCategoryRawValue,
        id: { value: counterPartyCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CounterPartyCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
