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

import { IFraudCategoryFlag, NewFraudCategoryFlag } from '../fraud-category-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFraudCategoryFlag for edit and NewFraudCategoryFlagFormGroupInput for create.
 */
type FraudCategoryFlagFormGroupInput = IFraudCategoryFlag | PartialWithRequiredKeyOf<NewFraudCategoryFlag>;

type FraudCategoryFlagFormDefaults = Pick<NewFraudCategoryFlag, 'id'>;

type FraudCategoryFlagFormGroupContent = {
  id: FormControl<IFraudCategoryFlag['id'] | NewFraudCategoryFlag['id']>;
  fraudCategoryFlag: FormControl<IFraudCategoryFlag['fraudCategoryFlag']>;
  fraudCategoryTypeDetails: FormControl<IFraudCategoryFlag['fraudCategoryTypeDetails']>;
};

export type FraudCategoryFlagFormGroup = FormGroup<FraudCategoryFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FraudCategoryFlagFormService {
  createFraudCategoryFlagFormGroup(fraudCategoryFlag: FraudCategoryFlagFormGroupInput = { id: null }): FraudCategoryFlagFormGroup {
    const fraudCategoryFlagRawValue = {
      ...this.getFormDefaults(),
      ...fraudCategoryFlag,
    };
    return new FormGroup<FraudCategoryFlagFormGroupContent>({
      id: new FormControl(
        { value: fraudCategoryFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fraudCategoryFlag: new FormControl(fraudCategoryFlagRawValue.fraudCategoryFlag, {
        validators: [Validators.required],
      }),
      fraudCategoryTypeDetails: new FormControl(fraudCategoryFlagRawValue.fraudCategoryTypeDetails),
    });
  }

  getFraudCategoryFlag(form: FraudCategoryFlagFormGroup): IFraudCategoryFlag | NewFraudCategoryFlag {
    return form.getRawValue() as IFraudCategoryFlag | NewFraudCategoryFlag;
  }

  resetForm(form: FraudCategoryFlagFormGroup, fraudCategoryFlag: FraudCategoryFlagFormGroupInput): void {
    const fraudCategoryFlagRawValue = { ...this.getFormDefaults(), ...fraudCategoryFlag };
    form.reset(
      {
        ...fraudCategoryFlagRawValue,
        id: { value: fraudCategoryFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FraudCategoryFlagFormDefaults {
    return {
      id: null,
    };
  }
}
