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

import { ILegalStatus, NewLegalStatus } from '../legal-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILegalStatus for edit and NewLegalStatusFormGroupInput for create.
 */
type LegalStatusFormGroupInput = ILegalStatus | PartialWithRequiredKeyOf<NewLegalStatus>;

type LegalStatusFormDefaults = Pick<NewLegalStatus, 'id'>;

type LegalStatusFormGroupContent = {
  id: FormControl<ILegalStatus['id'] | NewLegalStatus['id']>;
  legalStatusCode: FormControl<ILegalStatus['legalStatusCode']>;
  legalStatusType: FormControl<ILegalStatus['legalStatusType']>;
  legalStatusDescription: FormControl<ILegalStatus['legalStatusDescription']>;
};

export type LegalStatusFormGroup = FormGroup<LegalStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LegalStatusFormService {
  createLegalStatusFormGroup(legalStatus: LegalStatusFormGroupInput = { id: null }): LegalStatusFormGroup {
    const legalStatusRawValue = {
      ...this.getFormDefaults(),
      ...legalStatus,
    };
    return new FormGroup<LegalStatusFormGroupContent>({
      id: new FormControl(
        { value: legalStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      legalStatusCode: new FormControl(legalStatusRawValue.legalStatusCode, {
        validators: [Validators.required],
      }),
      legalStatusType: new FormControl(legalStatusRawValue.legalStatusType, {
        validators: [Validators.required],
      }),
      legalStatusDescription: new FormControl(legalStatusRawValue.legalStatusDescription),
    });
  }

  getLegalStatus(form: LegalStatusFormGroup): ILegalStatus | NewLegalStatus {
    return form.getRawValue() as ILegalStatus | NewLegalStatus;
  }

  resetForm(form: LegalStatusFormGroup, legalStatus: LegalStatusFormGroupInput): void {
    const legalStatusRawValue = { ...this.getFormDefaults(), ...legalStatus };
    form.reset(
      {
        ...legalStatusRawValue,
        id: { value: legalStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LegalStatusFormDefaults {
    return {
      id: null,
    };
  }
}
