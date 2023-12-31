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

import { IProcessStatus, NewProcessStatus } from '../process-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProcessStatus for edit and NewProcessStatusFormGroupInput for create.
 */
type ProcessStatusFormGroupInput = IProcessStatus | PartialWithRequiredKeyOf<NewProcessStatus>;

type ProcessStatusFormDefaults = Pick<NewProcessStatus, 'id' | 'placeholders' | 'parameters'>;

type ProcessStatusFormGroupContent = {
  id: FormControl<IProcessStatus['id'] | NewProcessStatus['id']>;
  statusCode: FormControl<IProcessStatus['statusCode']>;
  description: FormControl<IProcessStatus['description']>;
  placeholders: FormControl<IProcessStatus['placeholders']>;
  parameters: FormControl<IProcessStatus['parameters']>;
};

export type ProcessStatusFormGroup = FormGroup<ProcessStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProcessStatusFormService {
  createProcessStatusFormGroup(processStatus: ProcessStatusFormGroupInput = { id: null }): ProcessStatusFormGroup {
    const processStatusRawValue = {
      ...this.getFormDefaults(),
      ...processStatus,
    };
    return new FormGroup<ProcessStatusFormGroupContent>({
      id: new FormControl(
        { value: processStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      statusCode: new FormControl(processStatusRawValue.statusCode, {
        validators: [Validators.required],
      }),
      description: new FormControl(processStatusRawValue.description, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(processStatusRawValue.placeholders ?? []),
      parameters: new FormControl(processStatusRawValue.parameters ?? []),
    });
  }

  getProcessStatus(form: ProcessStatusFormGroup): IProcessStatus | NewProcessStatus {
    return form.getRawValue() as IProcessStatus | NewProcessStatus;
  }

  resetForm(form: ProcessStatusFormGroup, processStatus: ProcessStatusFormGroupInput): void {
    const processStatusRawValue = { ...this.getFormDefaults(), ...processStatus };
    form.reset(
      {
        ...processStatusRawValue,
        id: { value: processStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProcessStatusFormDefaults {
    return {
      id: null,
      placeholders: [],
      parameters: [],
    };
  }
}
