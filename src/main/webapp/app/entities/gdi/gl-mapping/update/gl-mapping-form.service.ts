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

import { IGlMapping, NewGlMapping } from '../gl-mapping.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGlMapping for edit and NewGlMappingFormGroupInput for create.
 */
type GlMappingFormGroupInput = IGlMapping | PartialWithRequiredKeyOf<NewGlMapping>;

type GlMappingFormDefaults = Pick<NewGlMapping, 'id'>;

type GlMappingFormGroupContent = {
  id: FormControl<IGlMapping['id'] | NewGlMapping['id']>;
  subGLCode: FormControl<IGlMapping['subGLCode']>;
  subGLDescription: FormControl<IGlMapping['subGLDescription']>;
  mainGLCode: FormControl<IGlMapping['mainGLCode']>;
  mainGLDescription: FormControl<IGlMapping['mainGLDescription']>;
  glType: FormControl<IGlMapping['glType']>;
};

export type GlMappingFormGroup = FormGroup<GlMappingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GlMappingFormService {
  createGlMappingFormGroup(glMapping: GlMappingFormGroupInput = { id: null }): GlMappingFormGroup {
    const glMappingRawValue = {
      ...this.getFormDefaults(),
      ...glMapping,
    };
    return new FormGroup<GlMappingFormGroupContent>({
      id: new FormControl(
        { value: glMappingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      subGLCode: new FormControl(glMappingRawValue.subGLCode, {
        validators: [Validators.required],
      }),
      subGLDescription: new FormControl(glMappingRawValue.subGLDescription),
      mainGLCode: new FormControl(glMappingRawValue.mainGLCode, {
        validators: [Validators.required],
      }),
      mainGLDescription: new FormControl(glMappingRawValue.mainGLDescription),
      glType: new FormControl(glMappingRawValue.glType, {
        validators: [Validators.required],
      }),
    });
  }

  getGlMapping(form: GlMappingFormGroup): IGlMapping | NewGlMapping {
    return form.getRawValue() as IGlMapping | NewGlMapping;
  }

  resetForm(form: GlMappingFormGroup, glMapping: GlMappingFormGroupInput): void {
    const glMappingRawValue = { ...this.getFormDefaults(), ...glMapping };
    form.reset(
      {
        ...glMappingRawValue,
        id: { value: glMappingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GlMappingFormDefaults {
    return {
      id: null,
    };
  }
}
