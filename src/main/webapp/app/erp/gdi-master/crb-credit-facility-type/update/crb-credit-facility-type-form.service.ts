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

import { ICrbCreditFacilityType, NewCrbCreditFacilityType } from '../crb-credit-facility-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbCreditFacilityType for edit and NewCrbCreditFacilityTypeFormGroupInput for create.
 */
type CrbCreditFacilityTypeFormGroupInput = ICrbCreditFacilityType | PartialWithRequiredKeyOf<NewCrbCreditFacilityType>;

type CrbCreditFacilityTypeFormDefaults = Pick<NewCrbCreditFacilityType, 'id'>;

type CrbCreditFacilityTypeFormGroupContent = {
  id: FormControl<ICrbCreditFacilityType['id'] | NewCrbCreditFacilityType['id']>;
  creditFacilityTypeCode: FormControl<ICrbCreditFacilityType['creditFacilityTypeCode']>;
  creditFacilityType: FormControl<ICrbCreditFacilityType['creditFacilityType']>;
  creditFacilityDescription: FormControl<ICrbCreditFacilityType['creditFacilityDescription']>;
};

export type CrbCreditFacilityTypeFormGroup = FormGroup<CrbCreditFacilityTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbCreditFacilityTypeFormService {
  createCrbCreditFacilityTypeFormGroup(
    crbCreditFacilityType: CrbCreditFacilityTypeFormGroupInput = { id: null }
  ): CrbCreditFacilityTypeFormGroup {
    const crbCreditFacilityTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbCreditFacilityType,
    };
    return new FormGroup<CrbCreditFacilityTypeFormGroupContent>({
      id: new FormControl(
        { value: crbCreditFacilityTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      creditFacilityTypeCode: new FormControl(crbCreditFacilityTypeRawValue.creditFacilityTypeCode, {
        validators: [Validators.required],
      }),
      creditFacilityType: new FormControl(crbCreditFacilityTypeRawValue.creditFacilityType, {
        validators: [Validators.required],
      }),
      creditFacilityDescription: new FormControl(crbCreditFacilityTypeRawValue.creditFacilityDescription),
    });
  }

  getCrbCreditFacilityType(form: CrbCreditFacilityTypeFormGroup): ICrbCreditFacilityType | NewCrbCreditFacilityType {
    return form.getRawValue() as ICrbCreditFacilityType | NewCrbCreditFacilityType;
  }

  resetForm(form: CrbCreditFacilityTypeFormGroup, crbCreditFacilityType: CrbCreditFacilityTypeFormGroupInput): void {
    const crbCreditFacilityTypeRawValue = { ...this.getFormDefaults(), ...crbCreditFacilityType };
    form.reset(
      {
        ...crbCreditFacilityTypeRawValue,
        id: { value: crbCreditFacilityTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbCreditFacilityTypeFormDefaults {
    return {
      id: null,
    };
  }
}
