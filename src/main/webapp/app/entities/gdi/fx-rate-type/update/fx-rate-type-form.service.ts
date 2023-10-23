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

import { IFxRateType, NewFxRateType } from '../fx-rate-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxRateType for edit and NewFxRateTypeFormGroupInput for create.
 */
type FxRateTypeFormGroupInput = IFxRateType | PartialWithRequiredKeyOf<NewFxRateType>;

type FxRateTypeFormDefaults = Pick<NewFxRateType, 'id'>;

type FxRateTypeFormGroupContent = {
  id: FormControl<IFxRateType['id'] | NewFxRateType['id']>;
  fxRateCode: FormControl<IFxRateType['fxRateCode']>;
  fxRateType: FormControl<IFxRateType['fxRateType']>;
  fxRateDetails: FormControl<IFxRateType['fxRateDetails']>;
};

export type FxRateTypeFormGroup = FormGroup<FxRateTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxRateTypeFormService {
  createFxRateTypeFormGroup(fxRateType: FxRateTypeFormGroupInput = { id: null }): FxRateTypeFormGroup {
    const fxRateTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxRateType,
    };
    return new FormGroup<FxRateTypeFormGroupContent>({
      id: new FormControl(
        { value: fxRateTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fxRateCode: new FormControl(fxRateTypeRawValue.fxRateCode, {
        validators: [Validators.required],
      }),
      fxRateType: new FormControl(fxRateTypeRawValue.fxRateType, {
        validators: [Validators.required],
      }),
      fxRateDetails: new FormControl(fxRateTypeRawValue.fxRateDetails),
    });
  }

  getFxRateType(form: FxRateTypeFormGroup): IFxRateType | NewFxRateType {
    return form.getRawValue() as IFxRateType | NewFxRateType;
  }

  resetForm(form: FxRateTypeFormGroup, fxRateType: FxRateTypeFormGroupInput): void {
    const fxRateTypeRawValue = { ...this.getFormDefaults(), ...fxRateType };
    form.reset(
      {
        ...fxRateTypeRawValue,
        id: { value: fxRateTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxRateTypeFormDefaults {
    return {
      id: null,
    };
  }
}
