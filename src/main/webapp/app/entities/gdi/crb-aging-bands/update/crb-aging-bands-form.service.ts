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
