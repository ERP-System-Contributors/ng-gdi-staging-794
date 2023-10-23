import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbAmountCategoryBand, NewCrbAmountCategoryBand } from '../crb-amount-category-band.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbAmountCategoryBand for edit and NewCrbAmountCategoryBandFormGroupInput for create.
 */
type CrbAmountCategoryBandFormGroupInput = ICrbAmountCategoryBand | PartialWithRequiredKeyOf<NewCrbAmountCategoryBand>;

type CrbAmountCategoryBandFormDefaults = Pick<NewCrbAmountCategoryBand, 'id'>;

type CrbAmountCategoryBandFormGroupContent = {
  id: FormControl<ICrbAmountCategoryBand['id'] | NewCrbAmountCategoryBand['id']>;
  amountCategoryBandCode: FormControl<ICrbAmountCategoryBand['amountCategoryBandCode']>;
  amountCategoryBand: FormControl<ICrbAmountCategoryBand['amountCategoryBand']>;
  amountCategoryBandDetails: FormControl<ICrbAmountCategoryBand['amountCategoryBandDetails']>;
};

export type CrbAmountCategoryBandFormGroup = FormGroup<CrbAmountCategoryBandFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbAmountCategoryBandFormService {
  createCrbAmountCategoryBandFormGroup(
    crbAmountCategoryBand: CrbAmountCategoryBandFormGroupInput = { id: null }
  ): CrbAmountCategoryBandFormGroup {
    const crbAmountCategoryBandRawValue = {
      ...this.getFormDefaults(),
      ...crbAmountCategoryBand,
    };
    return new FormGroup<CrbAmountCategoryBandFormGroupContent>({
      id: new FormControl(
        { value: crbAmountCategoryBandRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      amountCategoryBandCode: new FormControl(crbAmountCategoryBandRawValue.amountCategoryBandCode, {
        validators: [Validators.required],
      }),
      amountCategoryBand: new FormControl(crbAmountCategoryBandRawValue.amountCategoryBand, {
        validators: [Validators.required],
      }),
      amountCategoryBandDetails: new FormControl(crbAmountCategoryBandRawValue.amountCategoryBandDetails),
    });
  }

  getCrbAmountCategoryBand(form: CrbAmountCategoryBandFormGroup): ICrbAmountCategoryBand | NewCrbAmountCategoryBand {
    return form.getRawValue() as ICrbAmountCategoryBand | NewCrbAmountCategoryBand;
  }

  resetForm(form: CrbAmountCategoryBandFormGroup, crbAmountCategoryBand: CrbAmountCategoryBandFormGroupInput): void {
    const crbAmountCategoryBandRawValue = { ...this.getFormDefaults(), ...crbAmountCategoryBand };
    form.reset(
      {
        ...crbAmountCategoryBandRawValue,
        id: { value: crbAmountCategoryBandRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbAmountCategoryBandFormDefaults {
    return {
      id: null,
    };
  }
}
