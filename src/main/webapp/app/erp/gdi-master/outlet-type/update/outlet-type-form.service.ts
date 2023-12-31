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

import { IOutletType, NewOutletType } from '../outlet-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOutletType for edit and NewOutletTypeFormGroupInput for create.
 */
type OutletTypeFormGroupInput = IOutletType | PartialWithRequiredKeyOf<NewOutletType>;

type OutletTypeFormDefaults = Pick<NewOutletType, 'id' | 'placeholders'>;

type OutletTypeFormGroupContent = {
  id: FormControl<IOutletType['id'] | NewOutletType['id']>;
  outletTypeCode: FormControl<IOutletType['outletTypeCode']>;
  outletType: FormControl<IOutletType['outletType']>;
  outletTypeDetails: FormControl<IOutletType['outletTypeDetails']>;
  placeholders: FormControl<IOutletType['placeholders']>;
};

export type OutletTypeFormGroup = FormGroup<OutletTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OutletTypeFormService {
  createOutletTypeFormGroup(outletType: OutletTypeFormGroupInput = { id: null }): OutletTypeFormGroup {
    const outletTypeRawValue = {
      ...this.getFormDefaults(),
      ...outletType,
    };
    return new FormGroup<OutletTypeFormGroupContent>({
      id: new FormControl(
        { value: outletTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      outletTypeCode: new FormControl(outletTypeRawValue.outletTypeCode, {
        validators: [Validators.required],
      }),
      outletType: new FormControl(outletTypeRawValue.outletType, {
        validators: [Validators.required],
      }),
      outletTypeDetails: new FormControl(outletTypeRawValue.outletTypeDetails),
      placeholders: new FormControl(outletTypeRawValue.placeholders ?? []),
    });
  }

  getOutletType(form: OutletTypeFormGroup): IOutletType | NewOutletType {
    return form.getRawValue() as IOutletType | NewOutletType;
  }

  resetForm(form: OutletTypeFormGroup, outletType: OutletTypeFormGroupInput): void {
    const outletTypeRawValue = { ...this.getFormDefaults(), ...outletType };
    form.reset(
      {
        ...outletTypeRawValue,
        id: { value: outletTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OutletTypeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
