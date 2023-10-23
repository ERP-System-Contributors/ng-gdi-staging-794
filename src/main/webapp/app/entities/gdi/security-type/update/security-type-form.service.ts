import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISecurityType, NewSecurityType } from '../security-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISecurityType for edit and NewSecurityTypeFormGroupInput for create.
 */
type SecurityTypeFormGroupInput = ISecurityType | PartialWithRequiredKeyOf<NewSecurityType>;

type SecurityTypeFormDefaults = Pick<NewSecurityType, 'id'>;

type SecurityTypeFormGroupContent = {
  id: FormControl<ISecurityType['id'] | NewSecurityType['id']>;
  securityTypeCode: FormControl<ISecurityType['securityTypeCode']>;
  securityType: FormControl<ISecurityType['securityType']>;
  securityTypeDetails: FormControl<ISecurityType['securityTypeDetails']>;
  securityTypeDescription: FormControl<ISecurityType['securityTypeDescription']>;
};

export type SecurityTypeFormGroup = FormGroup<SecurityTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SecurityTypeFormService {
  createSecurityTypeFormGroup(securityType: SecurityTypeFormGroupInput = { id: null }): SecurityTypeFormGroup {
    const securityTypeRawValue = {
      ...this.getFormDefaults(),
      ...securityType,
    };
    return new FormGroup<SecurityTypeFormGroupContent>({
      id: new FormControl(
        { value: securityTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      securityTypeCode: new FormControl(securityTypeRawValue.securityTypeCode, {
        validators: [Validators.required],
      }),
      securityType: new FormControl(securityTypeRawValue.securityType, {
        validators: [Validators.required],
      }),
      securityTypeDetails: new FormControl(securityTypeRawValue.securityTypeDetails),
      securityTypeDescription: new FormControl(securityTypeRawValue.securityTypeDescription),
    });
  }

  getSecurityType(form: SecurityTypeFormGroup): ISecurityType | NewSecurityType {
    return form.getRawValue() as ISecurityType | NewSecurityType;
  }

  resetForm(form: SecurityTypeFormGroup, securityType: SecurityTypeFormGroupInput): void {
    const securityTypeRawValue = { ...this.getFormDefaults(), ...securityType };
    form.reset(
      {
        ...securityTypeRawValue,
        id: { value: securityTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SecurityTypeFormDefaults {
    return {
      id: null,
    };
  }
}
