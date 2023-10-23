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

import { ICrbGlCode, NewCrbGlCode } from '../crb-gl-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbGlCode for edit and NewCrbGlCodeFormGroupInput for create.
 */
type CrbGlCodeFormGroupInput = ICrbGlCode | PartialWithRequiredKeyOf<NewCrbGlCode>;

type CrbGlCodeFormDefaults = Pick<NewCrbGlCode, 'id'>;

type CrbGlCodeFormGroupContent = {
  id: FormControl<ICrbGlCode['id'] | NewCrbGlCode['id']>;
  glCode: FormControl<ICrbGlCode['glCode']>;
  glDescription: FormControl<ICrbGlCode['glDescription']>;
  glType: FormControl<ICrbGlCode['glType']>;
  institutionCategory: FormControl<ICrbGlCode['institutionCategory']>;
};

export type CrbGlCodeFormGroup = FormGroup<CrbGlCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbGlCodeFormService {
  createCrbGlCodeFormGroup(crbGlCode: CrbGlCodeFormGroupInput = { id: null }): CrbGlCodeFormGroup {
    const crbGlCodeRawValue = {
      ...this.getFormDefaults(),
      ...crbGlCode,
    };
    return new FormGroup<CrbGlCodeFormGroupContent>({
      id: new FormControl(
        { value: crbGlCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      glCode: new FormControl(crbGlCodeRawValue.glCode, {
        validators: [Validators.required],
      }),
      glDescription: new FormControl(crbGlCodeRawValue.glDescription, {
        validators: [Validators.required],
      }),
      glType: new FormControl(crbGlCodeRawValue.glType, {
        validators: [Validators.required],
      }),
      institutionCategory: new FormControl(crbGlCodeRawValue.institutionCategory, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbGlCode(form: CrbGlCodeFormGroup): ICrbGlCode | NewCrbGlCode {
    return form.getRawValue() as ICrbGlCode | NewCrbGlCode;
  }

  resetForm(form: CrbGlCodeFormGroup, crbGlCode: CrbGlCodeFormGroupInput): void {
    const crbGlCodeRawValue = { ...this.getFormDefaults(), ...crbGlCode };
    form.reset(
      {
        ...crbGlCodeRawValue,
        id: { value: crbGlCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbGlCodeFormDefaults {
    return {
      id: null,
    };
  }
}
