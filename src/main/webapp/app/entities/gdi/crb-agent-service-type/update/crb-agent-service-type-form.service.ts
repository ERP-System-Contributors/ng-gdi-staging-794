import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbAgentServiceType, NewCrbAgentServiceType } from '../crb-agent-service-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbAgentServiceType for edit and NewCrbAgentServiceTypeFormGroupInput for create.
 */
type CrbAgentServiceTypeFormGroupInput = ICrbAgentServiceType | PartialWithRequiredKeyOf<NewCrbAgentServiceType>;

type CrbAgentServiceTypeFormDefaults = Pick<NewCrbAgentServiceType, 'id'>;

type CrbAgentServiceTypeFormGroupContent = {
  id: FormControl<ICrbAgentServiceType['id'] | NewCrbAgentServiceType['id']>;
  agentServiceTypeCode: FormControl<ICrbAgentServiceType['agentServiceTypeCode']>;
  agentServiceTypeDetails: FormControl<ICrbAgentServiceType['agentServiceTypeDetails']>;
};

export type CrbAgentServiceTypeFormGroup = FormGroup<CrbAgentServiceTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbAgentServiceTypeFormService {
  createCrbAgentServiceTypeFormGroup(crbAgentServiceType: CrbAgentServiceTypeFormGroupInput = { id: null }): CrbAgentServiceTypeFormGroup {
    const crbAgentServiceTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbAgentServiceType,
    };
    return new FormGroup<CrbAgentServiceTypeFormGroupContent>({
      id: new FormControl(
        { value: crbAgentServiceTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      agentServiceTypeCode: new FormControl(crbAgentServiceTypeRawValue.agentServiceTypeCode, {
        validators: [Validators.required],
      }),
      agentServiceTypeDetails: new FormControl(crbAgentServiceTypeRawValue.agentServiceTypeDetails),
    });
  }

  getCrbAgentServiceType(form: CrbAgentServiceTypeFormGroup): ICrbAgentServiceType | NewCrbAgentServiceType {
    return form.getRawValue() as ICrbAgentServiceType | NewCrbAgentServiceType;
  }

  resetForm(form: CrbAgentServiceTypeFormGroup, crbAgentServiceType: CrbAgentServiceTypeFormGroupInput): void {
    const crbAgentServiceTypeRawValue = { ...this.getFormDefaults(), ...crbAgentServiceType };
    form.reset(
      {
        ...crbAgentServiceTypeRawValue,
        id: { value: crbAgentServiceTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbAgentServiceTypeFormDefaults {
    return {
      id: null,
    };
  }
}
