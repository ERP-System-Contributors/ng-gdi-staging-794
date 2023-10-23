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

import { IUniversallyUniqueMapping, NewUniversallyUniqueMapping } from '../universally-unique-mapping.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUniversallyUniqueMapping for edit and NewUniversallyUniqueMappingFormGroupInput for create.
 */
type UniversallyUniqueMappingFormGroupInput = IUniversallyUniqueMapping | PartialWithRequiredKeyOf<NewUniversallyUniqueMapping>;

type UniversallyUniqueMappingFormDefaults = Pick<NewUniversallyUniqueMapping, 'id' | 'placeholders'>;

type UniversallyUniqueMappingFormGroupContent = {
  id: FormControl<IUniversallyUniqueMapping['id'] | NewUniversallyUniqueMapping['id']>;
  universalKey: FormControl<IUniversallyUniqueMapping['universalKey']>;
  mappedValue: FormControl<IUniversallyUniqueMapping['mappedValue']>;
  parentMapping: FormControl<IUniversallyUniqueMapping['parentMapping']>;
  placeholders: FormControl<IUniversallyUniqueMapping['placeholders']>;
};

export type UniversallyUniqueMappingFormGroup = FormGroup<UniversallyUniqueMappingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UniversallyUniqueMappingFormService {
  createUniversallyUniqueMappingFormGroup(
    universallyUniqueMapping: UniversallyUniqueMappingFormGroupInput = { id: null }
  ): UniversallyUniqueMappingFormGroup {
    const universallyUniqueMappingRawValue = {
      ...this.getFormDefaults(),
      ...universallyUniqueMapping,
    };
    return new FormGroup<UniversallyUniqueMappingFormGroupContent>({
      id: new FormControl(
        { value: universallyUniqueMappingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      universalKey: new FormControl(universallyUniqueMappingRawValue.universalKey, {
        validators: [Validators.required],
      }),
      mappedValue: new FormControl(universallyUniqueMappingRawValue.mappedValue),
      parentMapping: new FormControl(universallyUniqueMappingRawValue.parentMapping),
      placeholders: new FormControl(universallyUniqueMappingRawValue.placeholders ?? []),
    });
  }

  getUniversallyUniqueMapping(form: UniversallyUniqueMappingFormGroup): IUniversallyUniqueMapping | NewUniversallyUniqueMapping {
    return form.getRawValue() as IUniversallyUniqueMapping | NewUniversallyUniqueMapping;
  }

  resetForm(form: UniversallyUniqueMappingFormGroup, universallyUniqueMapping: UniversallyUniqueMappingFormGroupInput): void {
    const universallyUniqueMappingRawValue = { ...this.getFormDefaults(), ...universallyUniqueMapping };
    form.reset(
      {
        ...universallyUniqueMappingRawValue,
        id: { value: universallyUniqueMappingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UniversallyUniqueMappingFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
