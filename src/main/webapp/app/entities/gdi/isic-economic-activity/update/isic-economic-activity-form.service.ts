import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IIsicEconomicActivity, NewIsicEconomicActivity } from '../isic-economic-activity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIsicEconomicActivity for edit and NewIsicEconomicActivityFormGroupInput for create.
 */
type IsicEconomicActivityFormGroupInput = IIsicEconomicActivity | PartialWithRequiredKeyOf<NewIsicEconomicActivity>;

type IsicEconomicActivityFormDefaults = Pick<NewIsicEconomicActivity, 'id'>;

type IsicEconomicActivityFormGroupContent = {
  id: FormControl<IIsicEconomicActivity['id'] | NewIsicEconomicActivity['id']>;
  businessEconomicActivityCode: FormControl<IIsicEconomicActivity['businessEconomicActivityCode']>;
  section: FormControl<IIsicEconomicActivity['section']>;
  sectionLabel: FormControl<IIsicEconomicActivity['sectionLabel']>;
  division: FormControl<IIsicEconomicActivity['division']>;
  divisionLabel: FormControl<IIsicEconomicActivity['divisionLabel']>;
  groupCode: FormControl<IIsicEconomicActivity['groupCode']>;
  groupLabel: FormControl<IIsicEconomicActivity['groupLabel']>;
  classCode: FormControl<IIsicEconomicActivity['classCode']>;
  businessEconomicActivityType: FormControl<IIsicEconomicActivity['businessEconomicActivityType']>;
  businessEconomicActivityTypeDescription: FormControl<IIsicEconomicActivity['businessEconomicActivityTypeDescription']>;
};

export type IsicEconomicActivityFormGroup = FormGroup<IsicEconomicActivityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IsicEconomicActivityFormService {
  createIsicEconomicActivityFormGroup(
    isicEconomicActivity: IsicEconomicActivityFormGroupInput = { id: null }
  ): IsicEconomicActivityFormGroup {
    const isicEconomicActivityRawValue = {
      ...this.getFormDefaults(),
      ...isicEconomicActivity,
    };
    return new FormGroup<IsicEconomicActivityFormGroupContent>({
      id: new FormControl(
        { value: isicEconomicActivityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      businessEconomicActivityCode: new FormControl(isicEconomicActivityRawValue.businessEconomicActivityCode, {
        validators: [Validators.required],
      }),
      section: new FormControl(isicEconomicActivityRawValue.section, {
        validators: [Validators.required],
      }),
      sectionLabel: new FormControl(isicEconomicActivityRawValue.sectionLabel, {
        validators: [Validators.required],
      }),
      division: new FormControl(isicEconomicActivityRawValue.division, {
        validators: [Validators.required],
      }),
      divisionLabel: new FormControl(isicEconomicActivityRawValue.divisionLabel, {
        validators: [Validators.required],
      }),
      groupCode: new FormControl(isicEconomicActivityRawValue.groupCode),
      groupLabel: new FormControl(isicEconomicActivityRawValue.groupLabel, {
        validators: [Validators.required],
      }),
      classCode: new FormControl(isicEconomicActivityRawValue.classCode, {
        validators: [Validators.required],
      }),
      businessEconomicActivityType: new FormControl(isicEconomicActivityRawValue.businessEconomicActivityType),
      businessEconomicActivityTypeDescription: new FormControl(isicEconomicActivityRawValue.businessEconomicActivityTypeDescription),
    });
  }

  getIsicEconomicActivity(form: IsicEconomicActivityFormGroup): IIsicEconomicActivity | NewIsicEconomicActivity {
    return form.getRawValue() as IIsicEconomicActivity | NewIsicEconomicActivity;
  }

  resetForm(form: IsicEconomicActivityFormGroup, isicEconomicActivity: IsicEconomicActivityFormGroupInput): void {
    const isicEconomicActivityRawValue = { ...this.getFormDefaults(), ...isicEconomicActivity };
    form.reset(
      {
        ...isicEconomicActivityRawValue,
        id: { value: isicEconomicActivityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IsicEconomicActivityFormDefaults {
    return {
      id: null,
    };
  }
}
