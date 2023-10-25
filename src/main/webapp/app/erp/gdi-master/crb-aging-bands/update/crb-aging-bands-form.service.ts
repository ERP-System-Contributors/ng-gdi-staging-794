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

import { ICrbAgingBands, NewCrbAgingBands } from '../crb-aging-bands.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbAgingBands for edit and NewCrbAgingBandsFormGroupInput for create.
 */
type CrbAgingBandsFormGroupInput = ICrbAgingBands | PartialWithRequiredKeyOf<NewCrbAgingBands>;

type CrbAgingBandsFormDefaults = Pick<NewCrbAgingBands, 'id'>;

type CrbAgingBandsFormGroupContent = {
  id: FormControl<ICrbAgingBands['id'] | NewCrbAgingBands['id']>;
  agingBandCategoryCode: FormControl<ICrbAgingBands['agingBandCategoryCode']>;
  agingBandCategory: FormControl<ICrbAgingBands['agingBandCategory']>;
  agingBandCategoryDetails: FormControl<ICrbAgingBands['agingBandCategoryDetails']>;
};

export type CrbAgingBandsFormGroup = FormGroup<CrbAgingBandsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbAgingBandsFormService {
  createCrbAgingBandsFormGroup(crbAgingBands: CrbAgingBandsFormGroupInput = { id: null }): CrbAgingBandsFormGroup {
    const crbAgingBandsRawValue = {
      ...this.getFormDefaults(),
      ...crbAgingBands,
    };
    return new FormGroup<CrbAgingBandsFormGroupContent>({
      id: new FormControl(
        { value: crbAgingBandsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      agingBandCategoryCode: new FormControl(crbAgingBandsRawValue.agingBandCategoryCode, {
        validators: [Validators.required],
      }),
      agingBandCategory: new FormControl(crbAgingBandsRawValue.agingBandCategory, {
        validators: [Validators.required],
      }),
      agingBandCategoryDetails: new FormControl(crbAgingBandsRawValue.agingBandCategoryDetails, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbAgingBands(form: CrbAgingBandsFormGroup): ICrbAgingBands | NewCrbAgingBands {
    return form.getRawValue() as ICrbAgingBands | NewCrbAgingBands;
  }

  resetForm(form: CrbAgingBandsFormGroup, crbAgingBands: CrbAgingBandsFormGroupInput): void {
    const crbAgingBandsRawValue = { ...this.getFormDefaults(), ...crbAgingBands };
    form.reset(
      {
        ...crbAgingBandsRawValue,
        id: { value: crbAgingBandsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbAgingBandsFormDefaults {
    return {
      id: null,
    };
  }
}
