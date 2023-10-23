import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInstitutionStatusType, NewInstitutionStatusType } from '../institution-status-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstitutionStatusType for edit and NewInstitutionStatusTypeFormGroupInput for create.
 */
type InstitutionStatusTypeFormGroupInput = IInstitutionStatusType | PartialWithRequiredKeyOf<NewInstitutionStatusType>;

type InstitutionStatusTypeFormDefaults = Pick<NewInstitutionStatusType, 'id'>;

type InstitutionStatusTypeFormGroupContent = {
  id: FormControl<IInstitutionStatusType['id'] | NewInstitutionStatusType['id']>;
  institutionStatusCode: FormControl<IInstitutionStatusType['institutionStatusCode']>;
  institutionStatusType: FormControl<IInstitutionStatusType['institutionStatusType']>;
  insitutionStatusTypeDescription: FormControl<IInstitutionStatusType['insitutionStatusTypeDescription']>;
};

export type InstitutionStatusTypeFormGroup = FormGroup<InstitutionStatusTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstitutionStatusTypeFormService {
  createInstitutionStatusTypeFormGroup(
    institutionStatusType: InstitutionStatusTypeFormGroupInput = { id: null }
  ): InstitutionStatusTypeFormGroup {
    const institutionStatusTypeRawValue = {
      ...this.getFormDefaults(),
      ...institutionStatusType,
    };
    return new FormGroup<InstitutionStatusTypeFormGroupContent>({
      id: new FormControl(
        { value: institutionStatusTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      institutionStatusCode: new FormControl(institutionStatusTypeRawValue.institutionStatusCode, {
        validators: [Validators.required],
      }),
      institutionStatusType: new FormControl(institutionStatusTypeRawValue.institutionStatusType),
      insitutionStatusTypeDescription: new FormControl(institutionStatusTypeRawValue.insitutionStatusTypeDescription),
    });
  }

  getInstitutionStatusType(form: InstitutionStatusTypeFormGroup): IInstitutionStatusType | NewInstitutionStatusType {
    return form.getRawValue() as IInstitutionStatusType | NewInstitutionStatusType;
  }

  resetForm(form: InstitutionStatusTypeFormGroup, institutionStatusType: InstitutionStatusTypeFormGroupInput): void {
    const institutionStatusTypeRawValue = { ...this.getFormDefaults(), ...institutionStatusType };
    form.reset(
      {
        ...institutionStatusTypeRawValue,
        id: { value: institutionStatusTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InstitutionStatusTypeFormDefaults {
    return {
      id: null,
    };
  }
}
