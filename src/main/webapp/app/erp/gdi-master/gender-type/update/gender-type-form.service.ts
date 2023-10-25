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

import { IGenderType, NewGenderType } from '../gender-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGenderType for edit and NewGenderTypeFormGroupInput for create.
 */
type GenderTypeFormGroupInput = IGenderType | PartialWithRequiredKeyOf<NewGenderType>;

type GenderTypeFormDefaults = Pick<NewGenderType, 'id'>;

type GenderTypeFormGroupContent = {
  id: FormControl<IGenderType['id'] | NewGenderType['id']>;
  genderCode: FormControl<IGenderType['genderCode']>;
  genderType: FormControl<IGenderType['genderType']>;
  genderDescription: FormControl<IGenderType['genderDescription']>;
};

export type GenderTypeFormGroup = FormGroup<GenderTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GenderTypeFormService {
  createGenderTypeFormGroup(genderType: GenderTypeFormGroupInput = { id: null }): GenderTypeFormGroup {
    const genderTypeRawValue = {
      ...this.getFormDefaults(),
      ...genderType,
    };
    return new FormGroup<GenderTypeFormGroupContent>({
      id: new FormControl(
        { value: genderTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      genderCode: new FormControl(genderTypeRawValue.genderCode, {
        validators: [Validators.required],
      }),
      genderType: new FormControl(genderTypeRawValue.genderType, {
        validators: [Validators.required],
      }),
      genderDescription: new FormControl(genderTypeRawValue.genderDescription),
    });
  }

  getGenderType(form: GenderTypeFormGroup): IGenderType | NewGenderType {
    return form.getRawValue() as IGenderType | NewGenderType;
  }

  resetForm(form: GenderTypeFormGroup, genderType: GenderTypeFormGroupInput): void {
    const genderTypeRawValue = { ...this.getFormDefaults(), ...genderType };
    form.reset(
      {
        ...genderTypeRawValue,
        id: { value: genderTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GenderTypeFormDefaults {
    return {
      id: null,
    };
  }
}
