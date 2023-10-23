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

import { IWeeklyCounterfeitHolding, NewWeeklyCounterfeitHolding } from '../weekly-counterfeit-holding.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWeeklyCounterfeitHolding for edit and NewWeeklyCounterfeitHoldingFormGroupInput for create.
 */
type WeeklyCounterfeitHoldingFormGroupInput = IWeeklyCounterfeitHolding | PartialWithRequiredKeyOf<NewWeeklyCounterfeitHolding>;

type WeeklyCounterfeitHoldingFormDefaults = Pick<NewWeeklyCounterfeitHolding, 'id'>;

type WeeklyCounterfeitHoldingFormGroupContent = {
  id: FormControl<IWeeklyCounterfeitHolding['id'] | NewWeeklyCounterfeitHolding['id']>;
  reportingDate: FormControl<IWeeklyCounterfeitHolding['reportingDate']>;
  dateConfiscated: FormControl<IWeeklyCounterfeitHolding['dateConfiscated']>;
  serialNumber: FormControl<IWeeklyCounterfeitHolding['serialNumber']>;
  depositorsNames: FormControl<IWeeklyCounterfeitHolding['depositorsNames']>;
  tellersNames: FormControl<IWeeklyCounterfeitHolding['tellersNames']>;
  dateSubmittedToCBK: FormControl<IWeeklyCounterfeitHolding['dateSubmittedToCBK']>;
  remarks: FormControl<IWeeklyCounterfeitHolding['remarks']>;
};

export type WeeklyCounterfeitHoldingFormGroup = FormGroup<WeeklyCounterfeitHoldingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WeeklyCounterfeitHoldingFormService {
  createWeeklyCounterfeitHoldingFormGroup(
    weeklyCounterfeitHolding: WeeklyCounterfeitHoldingFormGroupInput = { id: null }
  ): WeeklyCounterfeitHoldingFormGroup {
    const weeklyCounterfeitHoldingRawValue = {
      ...this.getFormDefaults(),
      ...weeklyCounterfeitHolding,
    };
    return new FormGroup<WeeklyCounterfeitHoldingFormGroupContent>({
      id: new FormControl(
        { value: weeklyCounterfeitHoldingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(weeklyCounterfeitHoldingRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      dateConfiscated: new FormControl(weeklyCounterfeitHoldingRawValue.dateConfiscated, {
        validators: [Validators.required],
      }),
      serialNumber: new FormControl(weeklyCounterfeitHoldingRawValue.serialNumber, {
        validators: [Validators.required],
      }),
      depositorsNames: new FormControl(weeklyCounterfeitHoldingRawValue.depositorsNames, {
        validators: [Validators.required],
      }),
      tellersNames: new FormControl(weeklyCounterfeitHoldingRawValue.tellersNames, {
        validators: [Validators.required],
      }),
      dateSubmittedToCBK: new FormControl(weeklyCounterfeitHoldingRawValue.dateSubmittedToCBK, {
        validators: [Validators.required],
      }),
      remarks: new FormControl(weeklyCounterfeitHoldingRawValue.remarks),
    });
  }

  getWeeklyCounterfeitHolding(form: WeeklyCounterfeitHoldingFormGroup): IWeeklyCounterfeitHolding | NewWeeklyCounterfeitHolding {
    return form.getRawValue() as IWeeklyCounterfeitHolding | NewWeeklyCounterfeitHolding;
  }

  resetForm(form: WeeklyCounterfeitHoldingFormGroup, weeklyCounterfeitHolding: WeeklyCounterfeitHoldingFormGroupInput): void {
    const weeklyCounterfeitHoldingRawValue = { ...this.getFormDefaults(), ...weeklyCounterfeitHolding };
    form.reset(
      {
        ...weeklyCounterfeitHoldingRawValue,
        id: { value: weeklyCounterfeitHoldingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WeeklyCounterfeitHoldingFormDefaults {
    return {
      id: null,
    };
  }
}
