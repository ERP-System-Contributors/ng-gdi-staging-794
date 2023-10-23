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

import { IGdiMasterDataIndex, NewGdiMasterDataIndex } from '../gdi-master-data-index.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGdiMasterDataIndex for edit and NewGdiMasterDataIndexFormGroupInput for create.
 */
type GdiMasterDataIndexFormGroupInput = IGdiMasterDataIndex | PartialWithRequiredKeyOf<NewGdiMasterDataIndex>;

type GdiMasterDataIndexFormDefaults = Pick<NewGdiMasterDataIndex, 'id'>;

type GdiMasterDataIndexFormGroupContent = {
  id: FormControl<IGdiMasterDataIndex['id'] | NewGdiMasterDataIndex['id']>;
  entityName: FormControl<IGdiMasterDataIndex['entityName']>;
  databaseName: FormControl<IGdiMasterDataIndex['databaseName']>;
  businessDescription: FormControl<IGdiMasterDataIndex['businessDescription']>;
};

export type GdiMasterDataIndexFormGroup = FormGroup<GdiMasterDataIndexFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GdiMasterDataIndexFormService {
  createGdiMasterDataIndexFormGroup(gdiMasterDataIndex: GdiMasterDataIndexFormGroupInput = { id: null }): GdiMasterDataIndexFormGroup {
    const gdiMasterDataIndexRawValue = {
      ...this.getFormDefaults(),
      ...gdiMasterDataIndex,
    };
    return new FormGroup<GdiMasterDataIndexFormGroupContent>({
      id: new FormControl(
        { value: gdiMasterDataIndexRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      entityName: new FormControl(gdiMasterDataIndexRawValue.entityName, {
        validators: [Validators.required],
      }),
      databaseName: new FormControl(gdiMasterDataIndexRawValue.databaseName, {
        validators: [Validators.required],
      }),
      businessDescription: new FormControl(gdiMasterDataIndexRawValue.businessDescription),
    });
  }

  getGdiMasterDataIndex(form: GdiMasterDataIndexFormGroup): IGdiMasterDataIndex | NewGdiMasterDataIndex {
    return form.getRawValue() as IGdiMasterDataIndex | NewGdiMasterDataIndex;
  }

  resetForm(form: GdiMasterDataIndexFormGroup, gdiMasterDataIndex: GdiMasterDataIndexFormGroupInput): void {
    const gdiMasterDataIndexRawValue = { ...this.getFormDefaults(), ...gdiMasterDataIndex };
    form.reset(
      {
        ...gdiMasterDataIndexRawValue,
        id: { value: gdiMasterDataIndexRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GdiMasterDataIndexFormDefaults {
    return {
      id: null,
    };
  }
}
