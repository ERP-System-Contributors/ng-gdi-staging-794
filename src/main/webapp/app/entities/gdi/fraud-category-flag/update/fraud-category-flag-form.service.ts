import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFraudCategoryFlag, NewFraudCategoryFlag } from '../fraud-category-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFraudCategoryFlag for edit and NewFraudCategoryFlagFormGroupInput for create.
 */
type FraudCategoryFlagFormGroupInput = IFraudCategoryFlag | PartialWithRequiredKeyOf<NewFraudCategoryFlag>;

type FraudCategoryFlagFormDefaults = Pick<NewFraudCategoryFlag, 'id'>;

type FraudCategoryFlagFormGroupContent = {
  id: FormControl<IFraudCategoryFlag['id'] | NewFraudCategoryFlag['id']>;
  fraudCategoryFlag: FormControl<IFraudCategoryFlag['fraudCategoryFlag']>;
  fraudCategoryTypeDetails: FormControl<IFraudCategoryFlag['fraudCategoryTypeDetails']>;
};

export type FraudCategoryFlagFormGroup = FormGroup<FraudCategoryFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FraudCategoryFlagFormService {
  createFraudCategoryFlagFormGroup(fraudCategoryFlag: FraudCategoryFlagFormGroupInput = { id: null }): FraudCategoryFlagFormGroup {
    const fraudCategoryFlagRawValue = {
      ...this.getFormDefaults(),
      ...fraudCategoryFlag,
    };
    return new FormGroup<FraudCategoryFlagFormGroupContent>({
      id: new FormControl(
        { value: fraudCategoryFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fraudCategoryFlag: new FormControl(fraudCategoryFlagRawValue.fraudCategoryFlag, {
        validators: [Validators.required],
      }),
      fraudCategoryTypeDetails: new FormControl(fraudCategoryFlagRawValue.fraudCategoryTypeDetails),
    });
  }

  getFraudCategoryFlag(form: FraudCategoryFlagFormGroup): IFraudCategoryFlag | NewFraudCategoryFlag {
    return form.getRawValue() as IFraudCategoryFlag | NewFraudCategoryFlag;
  }

  resetForm(form: FraudCategoryFlagFormGroup, fraudCategoryFlag: FraudCategoryFlagFormGroupInput): void {
    const fraudCategoryFlagRawValue = { ...this.getFormDefaults(), ...fraudCategoryFlag };
    form.reset(
      {
        ...fraudCategoryFlagRawValue,
        id: { value: fraudCategoryFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FraudCategoryFlagFormDefaults {
    return {
      id: null,
    };
  }
}
