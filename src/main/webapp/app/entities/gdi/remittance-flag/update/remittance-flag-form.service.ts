import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRemittanceFlag, NewRemittanceFlag } from '../remittance-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRemittanceFlag for edit and NewRemittanceFlagFormGroupInput for create.
 */
type RemittanceFlagFormGroupInput = IRemittanceFlag | PartialWithRequiredKeyOf<NewRemittanceFlag>;

type RemittanceFlagFormDefaults = Pick<NewRemittanceFlag, 'id'>;

type RemittanceFlagFormGroupContent = {
  id: FormControl<IRemittanceFlag['id'] | NewRemittanceFlag['id']>;
  remittanceTypeFlag: FormControl<IRemittanceFlag['remittanceTypeFlag']>;
  remittanceType: FormControl<IRemittanceFlag['remittanceType']>;
  remittanceTypeDetails: FormControl<IRemittanceFlag['remittanceTypeDetails']>;
};

export type RemittanceFlagFormGroup = FormGroup<RemittanceFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RemittanceFlagFormService {
  createRemittanceFlagFormGroup(remittanceFlag: RemittanceFlagFormGroupInput = { id: null }): RemittanceFlagFormGroup {
    const remittanceFlagRawValue = {
      ...this.getFormDefaults(),
      ...remittanceFlag,
    };
    return new FormGroup<RemittanceFlagFormGroupContent>({
      id: new FormControl(
        { value: remittanceFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      remittanceTypeFlag: new FormControl(remittanceFlagRawValue.remittanceTypeFlag, {
        validators: [Validators.required],
      }),
      remittanceType: new FormControl(remittanceFlagRawValue.remittanceType, {
        validators: [Validators.required],
      }),
      remittanceTypeDetails: new FormControl(remittanceFlagRawValue.remittanceTypeDetails),
    });
  }

  getRemittanceFlag(form: RemittanceFlagFormGroup): IRemittanceFlag | NewRemittanceFlag {
    return form.getRawValue() as IRemittanceFlag | NewRemittanceFlag;
  }

  resetForm(form: RemittanceFlagFormGroup, remittanceFlag: RemittanceFlagFormGroupInput): void {
    const remittanceFlagRawValue = { ...this.getFormDefaults(), ...remittanceFlag };
    form.reset(
      {
        ...remittanceFlagRawValue,
        id: { value: remittanceFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RemittanceFlagFormDefaults {
    return {
      id: null,
    };
  }
}
