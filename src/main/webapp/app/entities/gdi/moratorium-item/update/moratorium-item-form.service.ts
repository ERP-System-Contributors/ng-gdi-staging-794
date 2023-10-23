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

import { IMoratoriumItem, NewMoratoriumItem } from '../moratorium-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMoratoriumItem for edit and NewMoratoriumItemFormGroupInput for create.
 */
type MoratoriumItemFormGroupInput = IMoratoriumItem | PartialWithRequiredKeyOf<NewMoratoriumItem>;

type MoratoriumItemFormDefaults = Pick<NewMoratoriumItem, 'id'>;

type MoratoriumItemFormGroupContent = {
  id: FormControl<IMoratoriumItem['id'] | NewMoratoriumItem['id']>;
  moratoriumItemTypeCode: FormControl<IMoratoriumItem['moratoriumItemTypeCode']>;
  moratoriumItemType: FormControl<IMoratoriumItem['moratoriumItemType']>;
  moratoriumTypeDetails: FormControl<IMoratoriumItem['moratoriumTypeDetails']>;
};

export type MoratoriumItemFormGroup = FormGroup<MoratoriumItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MoratoriumItemFormService {
  createMoratoriumItemFormGroup(moratoriumItem: MoratoriumItemFormGroupInput = { id: null }): MoratoriumItemFormGroup {
    const moratoriumItemRawValue = {
      ...this.getFormDefaults(),
      ...moratoriumItem,
    };
    return new FormGroup<MoratoriumItemFormGroupContent>({
      id: new FormControl(
        { value: moratoriumItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      moratoriumItemTypeCode: new FormControl(moratoriumItemRawValue.moratoriumItemTypeCode, {
        validators: [Validators.required],
      }),
      moratoriumItemType: new FormControl(moratoriumItemRawValue.moratoriumItemType, {
        validators: [Validators.required],
      }),
      moratoriumTypeDetails: new FormControl(moratoriumItemRawValue.moratoriumTypeDetails),
    });
  }

  getMoratoriumItem(form: MoratoriumItemFormGroup): IMoratoriumItem | NewMoratoriumItem {
    return form.getRawValue() as IMoratoriumItem | NewMoratoriumItem;
  }

  resetForm(form: MoratoriumItemFormGroup, moratoriumItem: MoratoriumItemFormGroupInput): void {
    const moratoriumItemRawValue = { ...this.getFormDefaults(), ...moratoriumItem };
    form.reset(
      {
        ...moratoriumItemRawValue,
        id: { value: moratoriumItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MoratoriumItemFormDefaults {
    return {
      id: null,
    };
  }
}
