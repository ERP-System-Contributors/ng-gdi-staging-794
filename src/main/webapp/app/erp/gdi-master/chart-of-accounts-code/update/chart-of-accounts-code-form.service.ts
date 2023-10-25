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

import { IChartOfAccountsCode, NewChartOfAccountsCode } from '../chart-of-accounts-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChartOfAccountsCode for edit and NewChartOfAccountsCodeFormGroupInput for create.
 */
type ChartOfAccountsCodeFormGroupInput = IChartOfAccountsCode | PartialWithRequiredKeyOf<NewChartOfAccountsCode>;

type ChartOfAccountsCodeFormDefaults = Pick<NewChartOfAccountsCode, 'id'>;

type ChartOfAccountsCodeFormGroupContent = {
  id: FormControl<IChartOfAccountsCode['id'] | NewChartOfAccountsCode['id']>;
  chartOfAccountsCode: FormControl<IChartOfAccountsCode['chartOfAccountsCode']>;
  chartOfAccountsClass: FormControl<IChartOfAccountsCode['chartOfAccountsClass']>;
  description: FormControl<IChartOfAccountsCode['description']>;
};

export type ChartOfAccountsCodeFormGroup = FormGroup<ChartOfAccountsCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChartOfAccountsCodeFormService {
  createChartOfAccountsCodeFormGroup(chartOfAccountsCode: ChartOfAccountsCodeFormGroupInput = { id: null }): ChartOfAccountsCodeFormGroup {
    const chartOfAccountsCodeRawValue = {
      ...this.getFormDefaults(),
      ...chartOfAccountsCode,
    };
    return new FormGroup<ChartOfAccountsCodeFormGroupContent>({
      id: new FormControl(
        { value: chartOfAccountsCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      chartOfAccountsCode: new FormControl(chartOfAccountsCodeRawValue.chartOfAccountsCode, {
        validators: [Validators.required],
      }),
      chartOfAccountsClass: new FormControl(chartOfAccountsCodeRawValue.chartOfAccountsClass, {
        validators: [Validators.required],
      }),
      description: new FormControl(chartOfAccountsCodeRawValue.description),
    });
  }

  getChartOfAccountsCode(form: ChartOfAccountsCodeFormGroup): IChartOfAccountsCode | NewChartOfAccountsCode {
    return form.getRawValue() as IChartOfAccountsCode | NewChartOfAccountsCode;
  }

  resetForm(form: ChartOfAccountsCodeFormGroup, chartOfAccountsCode: ChartOfAccountsCodeFormGroupInput): void {
    const chartOfAccountsCodeRawValue = { ...this.getFormDefaults(), ...chartOfAccountsCode };
    form.reset(
      {
        ...chartOfAccountsCodeRawValue,
        id: { value: chartOfAccountsCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ChartOfAccountsCodeFormDefaults {
    return {
      id: null,
    };
  }
}
