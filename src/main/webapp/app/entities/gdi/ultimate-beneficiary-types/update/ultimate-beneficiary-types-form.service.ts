import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUltimateBeneficiaryTypes, NewUltimateBeneficiaryTypes } from '../ultimate-beneficiary-types.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUltimateBeneficiaryTypes for edit and NewUltimateBeneficiaryTypesFormGroupInput for create.
 */
type UltimateBeneficiaryTypesFormGroupInput = IUltimateBeneficiaryTypes | PartialWithRequiredKeyOf<NewUltimateBeneficiaryTypes>;

type UltimateBeneficiaryTypesFormDefaults = Pick<NewUltimateBeneficiaryTypes, 'id'>;

type UltimateBeneficiaryTypesFormGroupContent = {
  id: FormControl<IUltimateBeneficiaryTypes['id'] | NewUltimateBeneficiaryTypes['id']>;
  ultimateBeneficiaryTypeCode: FormControl<IUltimateBeneficiaryTypes['ultimateBeneficiaryTypeCode']>;
  ultimateBeneficiaryType: FormControl<IUltimateBeneficiaryTypes['ultimateBeneficiaryType']>;
  ultimateBeneficiaryTypeDetails: FormControl<IUltimateBeneficiaryTypes['ultimateBeneficiaryTypeDetails']>;
};

export type UltimateBeneficiaryTypesFormGroup = FormGroup<UltimateBeneficiaryTypesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UltimateBeneficiaryTypesFormService {
  createUltimateBeneficiaryTypesFormGroup(
    ultimateBeneficiaryTypes: UltimateBeneficiaryTypesFormGroupInput = { id: null }
  ): UltimateBeneficiaryTypesFormGroup {
    const ultimateBeneficiaryTypesRawValue = {
      ...this.getFormDefaults(),
      ...ultimateBeneficiaryTypes,
    };
    return new FormGroup<UltimateBeneficiaryTypesFormGroupContent>({
      id: new FormControl(
        { value: ultimateBeneficiaryTypesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ultimateBeneficiaryTypeCode: new FormControl(ultimateBeneficiaryTypesRawValue.ultimateBeneficiaryTypeCode, {
        validators: [Validators.required],
      }),
      ultimateBeneficiaryType: new FormControl(ultimateBeneficiaryTypesRawValue.ultimateBeneficiaryType, {
        validators: [Validators.required],
      }),
      ultimateBeneficiaryTypeDetails: new FormControl(ultimateBeneficiaryTypesRawValue.ultimateBeneficiaryTypeDetails),
    });
  }

  getUltimateBeneficiaryTypes(form: UltimateBeneficiaryTypesFormGroup): IUltimateBeneficiaryTypes | NewUltimateBeneficiaryTypes {
    return form.getRawValue() as IUltimateBeneficiaryTypes | NewUltimateBeneficiaryTypes;
  }

  resetForm(form: UltimateBeneficiaryTypesFormGroup, ultimateBeneficiaryTypes: UltimateBeneficiaryTypesFormGroupInput): void {
    const ultimateBeneficiaryTypesRawValue = { ...this.getFormDefaults(), ...ultimateBeneficiaryTypes };
    form.reset(
      {
        ...ultimateBeneficiaryTypesRawValue,
        id: { value: ultimateBeneficiaryTypesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UltimateBeneficiaryTypesFormDefaults {
    return {
      id: null,
    };
  }
}
