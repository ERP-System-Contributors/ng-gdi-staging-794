import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFiscalMonth, NewFiscalMonth } from '../fiscal-month.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFiscalMonth for edit and NewFiscalMonthFormGroupInput for create.
 */
type FiscalMonthFormGroupInput = IFiscalMonth | PartialWithRequiredKeyOf<NewFiscalMonth>;

type FiscalMonthFormDefaults = Pick<NewFiscalMonth, 'id' | 'placeholders' | 'universallyUniqueMappings'>;

type FiscalMonthFormGroupContent = {
  id: FormControl<IFiscalMonth['id'] | NewFiscalMonth['id']>;
  monthNumber: FormControl<IFiscalMonth['monthNumber']>;
  startDate: FormControl<IFiscalMonth['startDate']>;
  endDate: FormControl<IFiscalMonth['endDate']>;
  fiscalMonthCode: FormControl<IFiscalMonth['fiscalMonthCode']>;
  fiscalYear: FormControl<IFiscalMonth['fiscalYear']>;
  placeholders: FormControl<IFiscalMonth['placeholders']>;
  universallyUniqueMappings: FormControl<IFiscalMonth['universallyUniqueMappings']>;
  fiscalQuarter: FormControl<IFiscalMonth['fiscalQuarter']>;
};

export type FiscalMonthFormGroup = FormGroup<FiscalMonthFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FiscalMonthFormService {
  createFiscalMonthFormGroup(fiscalMonth: FiscalMonthFormGroupInput = { id: null }): FiscalMonthFormGroup {
    const fiscalMonthRawValue = {
      ...this.getFormDefaults(),
      ...fiscalMonth,
    };
    return new FormGroup<FiscalMonthFormGroupContent>({
      id: new FormControl(
        { value: fiscalMonthRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      monthNumber: new FormControl(fiscalMonthRawValue.monthNumber, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(fiscalMonthRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(fiscalMonthRawValue.endDate, {
        validators: [Validators.required],
      }),
      fiscalMonthCode: new FormControl(fiscalMonthRawValue.fiscalMonthCode, {
        validators: [Validators.required],
      }),
      fiscalYear: new FormControl(fiscalMonthRawValue.fiscalYear, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(fiscalMonthRawValue.placeholders ?? []),
      universallyUniqueMappings: new FormControl(fiscalMonthRawValue.universallyUniqueMappings ?? []),
      fiscalQuarter: new FormControl(fiscalMonthRawValue.fiscalQuarter),
    });
  }

  getFiscalMonth(form: FiscalMonthFormGroup): IFiscalMonth | NewFiscalMonth {
    return form.getRawValue() as IFiscalMonth | NewFiscalMonth;
  }

  resetForm(form: FiscalMonthFormGroup, fiscalMonth: FiscalMonthFormGroupInput): void {
    const fiscalMonthRawValue = { ...this.getFormDefaults(), ...fiscalMonth };
    form.reset(
      {
        ...fiscalMonthRawValue,
        id: { value: fiscalMonthRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FiscalMonthFormDefaults {
    return {
      id: null,
      placeholders: [],
      universallyUniqueMappings: [],
    };
  }
}
