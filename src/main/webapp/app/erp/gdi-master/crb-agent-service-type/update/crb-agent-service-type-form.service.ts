///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
