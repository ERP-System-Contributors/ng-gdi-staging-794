import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IManagementMemberType, NewManagementMemberType } from '../management-member-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IManagementMemberType for edit and NewManagementMemberTypeFormGroupInput for create.
 */
type ManagementMemberTypeFormGroupInput = IManagementMemberType | PartialWithRequiredKeyOf<NewManagementMemberType>;

type ManagementMemberTypeFormDefaults = Pick<NewManagementMemberType, 'id'>;

type ManagementMemberTypeFormGroupContent = {
  id: FormControl<IManagementMemberType['id'] | NewManagementMemberType['id']>;
  managementMemberTypeCode: FormControl<IManagementMemberType['managementMemberTypeCode']>;
  managementMemberType: FormControl<IManagementMemberType['managementMemberType']>;
};

export type ManagementMemberTypeFormGroup = FormGroup<ManagementMemberTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ManagementMemberTypeFormService {
  createManagementMemberTypeFormGroup(
    managementMemberType: ManagementMemberTypeFormGroupInput = { id: null }
  ): ManagementMemberTypeFormGroup {
    const managementMemberTypeRawValue = {
      ...this.getFormDefaults(),
      ...managementMemberType,
    };
    return new FormGroup<ManagementMemberTypeFormGroupContent>({
      id: new FormControl(
        { value: managementMemberTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      managementMemberTypeCode: new FormControl(managementMemberTypeRawValue.managementMemberTypeCode, {
        validators: [Validators.required],
      }),
      managementMemberType: new FormControl(managementMemberTypeRawValue.managementMemberType, {
        validators: [Validators.required],
      }),
    });
  }

  getManagementMemberType(form: ManagementMemberTypeFormGroup): IManagementMemberType | NewManagementMemberType {
    return form.getRawValue() as IManagementMemberType | NewManagementMemberType;
  }

  resetForm(form: ManagementMemberTypeFormGroup, managementMemberType: ManagementMemberTypeFormGroupInput): void {
    const managementMemberTypeRawValue = { ...this.getFormDefaults(), ...managementMemberType };
    form.reset(
      {
        ...managementMemberTypeRawValue,
        id: { value: managementMemberTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ManagementMemberTypeFormDefaults {
    return {
      id: null,
    };
  }
}
