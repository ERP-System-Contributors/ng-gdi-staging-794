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

import { ICrbSubscriptionStatusTypeCode, NewCrbSubscriptionStatusTypeCode } from '../crb-subscription-status-type-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbSubscriptionStatusTypeCode for edit and NewCrbSubscriptionStatusTypeCodeFormGroupInput for create.
 */
type CrbSubscriptionStatusTypeCodeFormGroupInput =
  | ICrbSubscriptionStatusTypeCode
  | PartialWithRequiredKeyOf<NewCrbSubscriptionStatusTypeCode>;

type CrbSubscriptionStatusTypeCodeFormDefaults = Pick<NewCrbSubscriptionStatusTypeCode, 'id'>;

type CrbSubscriptionStatusTypeCodeFormGroupContent = {
  id: FormControl<ICrbSubscriptionStatusTypeCode['id'] | NewCrbSubscriptionStatusTypeCode['id']>;
  subscriptionStatusTypeCode: FormControl<ICrbSubscriptionStatusTypeCode['subscriptionStatusTypeCode']>;
  subscriptionStatusType: FormControl<ICrbSubscriptionStatusTypeCode['subscriptionStatusType']>;
  subscriptionStatusTypeDescription: FormControl<ICrbSubscriptionStatusTypeCode['subscriptionStatusTypeDescription']>;
};

export type CrbSubscriptionStatusTypeCodeFormGroup = FormGroup<CrbSubscriptionStatusTypeCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbSubscriptionStatusTypeCodeFormService {
  createCrbSubscriptionStatusTypeCodeFormGroup(
    crbSubscriptionStatusTypeCode: CrbSubscriptionStatusTypeCodeFormGroupInput = { id: null }
  ): CrbSubscriptionStatusTypeCodeFormGroup {
    const crbSubscriptionStatusTypeCodeRawValue = {
      ...this.getFormDefaults(),
      ...crbSubscriptionStatusTypeCode,
    };
    return new FormGroup<CrbSubscriptionStatusTypeCodeFormGroupContent>({
      id: new FormControl(
        { value: crbSubscriptionStatusTypeCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      subscriptionStatusTypeCode: new FormControl(crbSubscriptionStatusTypeCodeRawValue.subscriptionStatusTypeCode, {
        validators: [Validators.required],
      }),
      subscriptionStatusType: new FormControl(crbSubscriptionStatusTypeCodeRawValue.subscriptionStatusType, {
        validators: [Validators.required],
      }),
      subscriptionStatusTypeDescription: new FormControl(crbSubscriptionStatusTypeCodeRawValue.subscriptionStatusTypeDescription),
    });
  }

  getCrbSubscriptionStatusTypeCode(
    form: CrbSubscriptionStatusTypeCodeFormGroup
  ): ICrbSubscriptionStatusTypeCode | NewCrbSubscriptionStatusTypeCode {
    return form.getRawValue() as ICrbSubscriptionStatusTypeCode | NewCrbSubscriptionStatusTypeCode;
  }

  resetForm(
    form: CrbSubscriptionStatusTypeCodeFormGroup,
    crbSubscriptionStatusTypeCode: CrbSubscriptionStatusTypeCodeFormGroupInput
  ): void {
    const crbSubscriptionStatusTypeCodeRawValue = { ...this.getFormDefaults(), ...crbSubscriptionStatusTypeCode };
    form.reset(
      {
        ...crbSubscriptionStatusTypeCodeRawValue,
        id: { value: crbSubscriptionStatusTypeCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbSubscriptionStatusTypeCodeFormDefaults {
    return {
      id: null,
    };
  }
}
