import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFiscalQuarter, NewFiscalQuarter } from '../fiscal-quarter.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFiscalQuarter for edit and NewFiscalQuarterFormGroupInput for create.
 */
type FiscalQuarterFormGroupInput = IFiscalQuarter | PartialWithRequiredKeyOf<NewFiscalQuarter>;

type FiscalQuarterFormDefaults = Pick<NewFiscalQuarter, 'id' | 'placeholders' | 'universallyUniqueMappings'>;

type FiscalQuarterFormGroupContent = {
  id: FormControl<IFiscalQuarter['id'] | NewFiscalQuarter['id']>;
  quarterNumber: FormControl<IFiscalQuarter['quarterNumber']>;
  startDate: FormControl<IFiscalQuarter['startDate']>;
  endDate: FormControl<IFiscalQuarter['endDate']>;
  fiscalQuarterCode: FormControl<IFiscalQuarter['fiscalQuarterCode']>;
  fiscalYear: FormControl<IFiscalQuarter['fiscalYear']>;
  placeholders: FormControl<IFiscalQuarter['placeholders']>;
  universallyUniqueMappings: FormControl<IFiscalQuarter['universallyUniqueMappings']>;
};

export type FiscalQuarterFormGroup = FormGroup<FiscalQuarterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FiscalQuarterFormService {
  createFiscalQuarterFormGroup(fiscalQuarter: FiscalQuarterFormGroupInput = { id: null }): FiscalQuarterFormGroup {
    const fiscalQuarterRawValue = {
      ...this.getFormDefaults(),
      ...fiscalQuarter,
    };
    return new FormGroup<FiscalQuarterFormGroupContent>({
      id: new FormControl(
        { value: fiscalQuarterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      quarterNumber: new FormControl(fiscalQuarterRawValue.quarterNumber, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(fiscalQuarterRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(fiscalQuarterRawValue.endDate, {
        validators: [Validators.required],
      }),
      fiscalQuarterCode: new FormControl(fiscalQuarterRawValue.fiscalQuarterCode, {
        validators: [Validators.required],
      }),
      fiscalYear: new FormControl(fiscalQuarterRawValue.fiscalYear, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(fiscalQuarterRawValue.placeholders ?? []),
      universallyUniqueMappings: new FormControl(fiscalQuarterRawValue.universallyUniqueMappings ?? []),
    });
  }

  getFiscalQuarter(form: FiscalQuarterFormGroup): IFiscalQuarter | NewFiscalQuarter {
    return form.getRawValue() as IFiscalQuarter | NewFiscalQuarter;
  }

  resetForm(form: FiscalQuarterFormGroup, fiscalQuarter: FiscalQuarterFormGroupInput): void {
    const fiscalQuarterRawValue = { ...this.getFormDefaults(), ...fiscalQuarter };
    form.reset(
      {
        ...fiscalQuarterRawValue,
        id: { value: fiscalQuarterRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FiscalQuarterFormDefaults {
    return {
      id: null,
      placeholders: [],
      universallyUniqueMappings: [],
    };
  }
}
