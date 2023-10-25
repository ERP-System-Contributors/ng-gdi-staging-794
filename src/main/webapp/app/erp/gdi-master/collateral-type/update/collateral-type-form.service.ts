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

import { ICollateralType, NewCollateralType } from '../collateral-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICollateralType for edit and NewCollateralTypeFormGroupInput for create.
 */
type CollateralTypeFormGroupInput = ICollateralType | PartialWithRequiredKeyOf<NewCollateralType>;

type CollateralTypeFormDefaults = Pick<NewCollateralType, 'id'>;

type CollateralTypeFormGroupContent = {
  id: FormControl<ICollateralType['id'] | NewCollateralType['id']>;
  collateralTypeCode: FormControl<ICollateralType['collateralTypeCode']>;
  collateralType: FormControl<ICollateralType['collateralType']>;
  collateralTypeDescription: FormControl<ICollateralType['collateralTypeDescription']>;
};

export type CollateralTypeFormGroup = FormGroup<CollateralTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CollateralTypeFormService {
  createCollateralTypeFormGroup(collateralType: CollateralTypeFormGroupInput = { id: null }): CollateralTypeFormGroup {
    const collateralTypeRawValue = {
      ...this.getFormDefaults(),
      ...collateralType,
    };
    return new FormGroup<CollateralTypeFormGroupContent>({
      id: new FormControl(
        { value: collateralTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      collateralTypeCode: new FormControl(collateralTypeRawValue.collateralTypeCode, {
        validators: [Validators.required],
      }),
      collateralType: new FormControl(collateralTypeRawValue.collateralType, {
        validators: [Validators.required],
      }),
      collateralTypeDescription: new FormControl(collateralTypeRawValue.collateralTypeDescription),
    });
  }

  getCollateralType(form: CollateralTypeFormGroup): ICollateralType | NewCollateralType {
    return form.getRawValue() as ICollateralType | NewCollateralType;
  }

  resetForm(form: CollateralTypeFormGroup, collateralType: CollateralTypeFormGroupInput): void {
    const collateralTypeRawValue = { ...this.getFormDefaults(), ...collateralType };
    form.reset(
      {
        ...collateralTypeRawValue,
        id: { value: collateralTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CollateralTypeFormDefaults {
    return {
      id: null,
    };
  }
}
