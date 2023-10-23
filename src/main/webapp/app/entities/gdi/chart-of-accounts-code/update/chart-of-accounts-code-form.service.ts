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
