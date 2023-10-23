import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBouncedChequeCategories, NewBouncedChequeCategories } from '../bounced-cheque-categories.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBouncedChequeCategories for edit and NewBouncedChequeCategoriesFormGroupInput for create.
 */
type BouncedChequeCategoriesFormGroupInput = IBouncedChequeCategories | PartialWithRequiredKeyOf<NewBouncedChequeCategories>;

type BouncedChequeCategoriesFormDefaults = Pick<NewBouncedChequeCategories, 'id'>;

type BouncedChequeCategoriesFormGroupContent = {
  id: FormControl<IBouncedChequeCategories['id'] | NewBouncedChequeCategories['id']>;
  bouncedChequeCategoryTypeCode: FormControl<IBouncedChequeCategories['bouncedChequeCategoryTypeCode']>;
  bouncedChequeCategoryType: FormControl<IBouncedChequeCategories['bouncedChequeCategoryType']>;
};

export type BouncedChequeCategoriesFormGroup = FormGroup<BouncedChequeCategoriesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BouncedChequeCategoriesFormService {
  createBouncedChequeCategoriesFormGroup(
    bouncedChequeCategories: BouncedChequeCategoriesFormGroupInput = { id: null }
  ): BouncedChequeCategoriesFormGroup {
    const bouncedChequeCategoriesRawValue = {
      ...this.getFormDefaults(),
      ...bouncedChequeCategories,
    };
    return new FormGroup<BouncedChequeCategoriesFormGroupContent>({
      id: new FormControl(
        { value: bouncedChequeCategoriesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      bouncedChequeCategoryTypeCode: new FormControl(bouncedChequeCategoriesRawValue.bouncedChequeCategoryTypeCode, {
        validators: [Validators.required],
      }),
      bouncedChequeCategoryType: new FormControl(bouncedChequeCategoriesRawValue.bouncedChequeCategoryType, {
        validators: [Validators.required],
      }),
    });
  }

  getBouncedChequeCategories(form: BouncedChequeCategoriesFormGroup): IBouncedChequeCategories | NewBouncedChequeCategories {
    return form.getRawValue() as IBouncedChequeCategories | NewBouncedChequeCategories;
  }

  resetForm(form: BouncedChequeCategoriesFormGroup, bouncedChequeCategories: BouncedChequeCategoriesFormGroupInput): void {
    const bouncedChequeCategoriesRawValue = { ...this.getFormDefaults(), ...bouncedChequeCategories };
    form.reset(
      {
        ...bouncedChequeCategoriesRawValue,
        id: { value: bouncedChequeCategoriesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BouncedChequeCategoriesFormDefaults {
    return {
      id: null,
    };
  }
}
