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

import { IWeeklyCashHolding, NewWeeklyCashHolding } from '../weekly-cash-holding.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWeeklyCashHolding for edit and NewWeeklyCashHoldingFormGroupInput for create.
 */
type WeeklyCashHoldingFormGroupInput = IWeeklyCashHolding | PartialWithRequiredKeyOf<NewWeeklyCashHolding>;

type WeeklyCashHoldingFormDefaults = Pick<NewWeeklyCashHolding, 'id'>;

type WeeklyCashHoldingFormGroupContent = {
  id: FormControl<IWeeklyCashHolding['id'] | NewWeeklyCashHolding['id']>;
  reportingDate: FormControl<IWeeklyCashHolding['reportingDate']>;
  fitUnits: FormControl<IWeeklyCashHolding['fitUnits']>;
  unfitUnits: FormControl<IWeeklyCashHolding['unfitUnits']>;
  bankCode: FormControl<IWeeklyCashHolding['bankCode']>;
  branchId: FormControl<IWeeklyCashHolding['branchId']>;
  subCountyCode: FormControl<IWeeklyCashHolding['subCountyCode']>;
  denomination: FormControl<IWeeklyCashHolding['denomination']>;
};

export type WeeklyCashHoldingFormGroup = FormGroup<WeeklyCashHoldingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WeeklyCashHoldingFormService {
  createWeeklyCashHoldingFormGroup(weeklyCashHolding: WeeklyCashHoldingFormGroupInput = { id: null }): WeeklyCashHoldingFormGroup {
    const weeklyCashHoldingRawValue = {
      ...this.getFormDefaults(),
      ...weeklyCashHolding,
    };
    return new FormGroup<WeeklyCashHoldingFormGroupContent>({
      id: new FormControl(
        { value: weeklyCashHoldingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(weeklyCashHoldingRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      fitUnits: new FormControl(weeklyCashHoldingRawValue.fitUnits, {
        validators: [Validators.required],
      }),
      unfitUnits: new FormControl(weeklyCashHoldingRawValue.unfitUnits, {
        validators: [Validators.required],
      }),
      bankCode: new FormControl(weeklyCashHoldingRawValue.bankCode, {
        validators: [Validators.required],
      }),
      branchId: new FormControl(weeklyCashHoldingRawValue.branchId, {
        validators: [Validators.required],
      }),
      subCountyCode: new FormControl(weeklyCashHoldingRawValue.subCountyCode, {
        validators: [Validators.required],
      }),
      denomination: new FormControl(weeklyCashHoldingRawValue.denomination, {
        validators: [Validators.required],
      }),
    });
  }

  getWeeklyCashHolding(form: WeeklyCashHoldingFormGroup): IWeeklyCashHolding | NewWeeklyCashHolding {
    return form.getRawValue() as IWeeklyCashHolding | NewWeeklyCashHolding;
  }

  resetForm(form: WeeklyCashHoldingFormGroup, weeklyCashHolding: WeeklyCashHoldingFormGroupInput): void {
    const weeklyCashHoldingRawValue = { ...this.getFormDefaults(), ...weeklyCashHolding };
    form.reset(
      {
        ...weeklyCashHoldingRawValue,
        id: { value: weeklyCashHoldingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WeeklyCashHoldingFormDefaults {
    return {
      id: null,
    };
  }
}
