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

import { ICrbAccountHolderType, NewCrbAccountHolderType } from '../crb-account-holder-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbAccountHolderType for edit and NewCrbAccountHolderTypeFormGroupInput for create.
 */
type CrbAccountHolderTypeFormGroupInput = ICrbAccountHolderType | PartialWithRequiredKeyOf<NewCrbAccountHolderType>;

type CrbAccountHolderTypeFormDefaults = Pick<NewCrbAccountHolderType, 'id'>;

type CrbAccountHolderTypeFormGroupContent = {
  id: FormControl<ICrbAccountHolderType['id'] | NewCrbAccountHolderType['id']>;
  accountHolderCategoryTypeCode: FormControl<ICrbAccountHolderType['accountHolderCategoryTypeCode']>;
  accountHolderCategoryType: FormControl<ICrbAccountHolderType['accountHolderCategoryType']>;
};

export type CrbAccountHolderTypeFormGroup = FormGroup<CrbAccountHolderTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbAccountHolderTypeFormService {
  createCrbAccountHolderTypeFormGroup(
    crbAccountHolderType: CrbAccountHolderTypeFormGroupInput = { id: null }
  ): CrbAccountHolderTypeFormGroup {
    const crbAccountHolderTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbAccountHolderType,
    };
    return new FormGroup<CrbAccountHolderTypeFormGroupContent>({
      id: new FormControl(
        { value: crbAccountHolderTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountHolderCategoryTypeCode: new FormControl(crbAccountHolderTypeRawValue.accountHolderCategoryTypeCode, {
        validators: [Validators.required],
      }),
      accountHolderCategoryType: new FormControl(crbAccountHolderTypeRawValue.accountHolderCategoryType, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbAccountHolderType(form: CrbAccountHolderTypeFormGroup): ICrbAccountHolderType | NewCrbAccountHolderType {
    return form.getRawValue() as ICrbAccountHolderType | NewCrbAccountHolderType;
  }

  resetForm(form: CrbAccountHolderTypeFormGroup, crbAccountHolderType: CrbAccountHolderTypeFormGroupInput): void {
    const crbAccountHolderTypeRawValue = { ...this.getFormDefaults(), ...crbAccountHolderType };
    form.reset(
      {
        ...crbAccountHolderTypeRawValue,
        id: { value: crbAccountHolderTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbAccountHolderTypeFormDefaults {
    return {
      id: null,
    };
  }
}
