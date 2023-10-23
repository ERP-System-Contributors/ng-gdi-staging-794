import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDerivativeUnderlyingAsset, NewDerivativeUnderlyingAsset } from '../derivative-underlying-asset.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDerivativeUnderlyingAsset for edit and NewDerivativeUnderlyingAssetFormGroupInput for create.
 */
type DerivativeUnderlyingAssetFormGroupInput = IDerivativeUnderlyingAsset | PartialWithRequiredKeyOf<NewDerivativeUnderlyingAsset>;

type DerivativeUnderlyingAssetFormDefaults = Pick<NewDerivativeUnderlyingAsset, 'id'>;

type DerivativeUnderlyingAssetFormGroupContent = {
  id: FormControl<IDerivativeUnderlyingAsset['id'] | NewDerivativeUnderlyingAsset['id']>;
  derivativeUnderlyingAssetTypeCode: FormControl<IDerivativeUnderlyingAsset['derivativeUnderlyingAssetTypeCode']>;
  financialDerivativeUnderlyingAssetType: FormControl<IDerivativeUnderlyingAsset['financialDerivativeUnderlyingAssetType']>;
  derivativeUnderlyingAssetTypeDetails: FormControl<IDerivativeUnderlyingAsset['derivativeUnderlyingAssetTypeDetails']>;
};

export type DerivativeUnderlyingAssetFormGroup = FormGroup<DerivativeUnderlyingAssetFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DerivativeUnderlyingAssetFormService {
  createDerivativeUnderlyingAssetFormGroup(
    derivativeUnderlyingAsset: DerivativeUnderlyingAssetFormGroupInput = { id: null }
  ): DerivativeUnderlyingAssetFormGroup {
    const derivativeUnderlyingAssetRawValue = {
      ...this.getFormDefaults(),
      ...derivativeUnderlyingAsset,
    };
    return new FormGroup<DerivativeUnderlyingAssetFormGroupContent>({
      id: new FormControl(
        { value: derivativeUnderlyingAssetRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      derivativeUnderlyingAssetTypeCode: new FormControl(derivativeUnderlyingAssetRawValue.derivativeUnderlyingAssetTypeCode, {
        validators: [Validators.required],
      }),
      financialDerivativeUnderlyingAssetType: new FormControl(derivativeUnderlyingAssetRawValue.financialDerivativeUnderlyingAssetType, {
        validators: [Validators.required],
      }),
      derivativeUnderlyingAssetTypeDetails: new FormControl(derivativeUnderlyingAssetRawValue.derivativeUnderlyingAssetTypeDetails),
    });
  }

  getDerivativeUnderlyingAsset(form: DerivativeUnderlyingAssetFormGroup): IDerivativeUnderlyingAsset | NewDerivativeUnderlyingAsset {
    return form.getRawValue() as IDerivativeUnderlyingAsset | NewDerivativeUnderlyingAsset;
  }

  resetForm(form: DerivativeUnderlyingAssetFormGroup, derivativeUnderlyingAsset: DerivativeUnderlyingAssetFormGroupInput): void {
    const derivativeUnderlyingAssetRawValue = { ...this.getFormDefaults(), ...derivativeUnderlyingAsset };
    form.reset(
      {
        ...derivativeUnderlyingAssetRawValue,
        id: { value: derivativeUnderlyingAssetRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DerivativeUnderlyingAssetFormDefaults {
    return {
      id: null,
    };
  }
}
