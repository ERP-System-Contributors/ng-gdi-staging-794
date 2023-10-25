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

import { IMerchantType, NewMerchantType } from '../merchant-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMerchantType for edit and NewMerchantTypeFormGroupInput for create.
 */
type MerchantTypeFormGroupInput = IMerchantType | PartialWithRequiredKeyOf<NewMerchantType>;

type MerchantTypeFormDefaults = Pick<NewMerchantType, 'id'>;

type MerchantTypeFormGroupContent = {
  id: FormControl<IMerchantType['id'] | NewMerchantType['id']>;
  merchantTypeCode: FormControl<IMerchantType['merchantTypeCode']>;
  merchantType: FormControl<IMerchantType['merchantType']>;
  merchantTypeDetails: FormControl<IMerchantType['merchantTypeDetails']>;
};

export type MerchantTypeFormGroup = FormGroup<MerchantTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MerchantTypeFormService {
  createMerchantTypeFormGroup(merchantType: MerchantTypeFormGroupInput = { id: null }): MerchantTypeFormGroup {
    const merchantTypeRawValue = {
      ...this.getFormDefaults(),
      ...merchantType,
    };
    return new FormGroup<MerchantTypeFormGroupContent>({
      id: new FormControl(
        { value: merchantTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      merchantTypeCode: new FormControl(merchantTypeRawValue.merchantTypeCode, {
        validators: [Validators.required],
      }),
      merchantType: new FormControl(merchantTypeRawValue.merchantType, {
        validators: [Validators.required],
      }),
      merchantTypeDetails: new FormControl(merchantTypeRawValue.merchantTypeDetails),
    });
  }

  getMerchantType(form: MerchantTypeFormGroup): IMerchantType | NewMerchantType {
    return form.getRawValue() as IMerchantType | NewMerchantType;
  }

  resetForm(form: MerchantTypeFormGroup, merchantType: MerchantTypeFormGroupInput): void {
    const merchantTypeRawValue = { ...this.getFormDefaults(), ...merchantType };
    form.reset(
      {
        ...merchantTypeRawValue,
        id: { value: merchantTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MerchantTypeFormDefaults {
    return {
      id: null,
    };
  }
}
